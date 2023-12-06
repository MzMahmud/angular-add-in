import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { getHtmlContent } from '../../models/gist.model';
import { Settings } from '../../models/settings.model';
import { GistService } from '../../services/gist.service';
import { OfficeService } from '../../services/office.service';
import { SettingsService } from '../../services/settings.service';
import { addQueryParamToUrl, getAbsoluteUrl } from '../../util/string.util';

@Component({
  selector: 'app-actions',
  template:
    '<pre>This component does not load any UI. Just runs the registered functoions.</pre>',
})
export class ActionsComponent implements OnDestroy {
  private static INSERT_DEFAULT_GIST_FN_NAME = 'insertDefaultGist';

  selectedGistId: string | null = null;
  errorMessage: string | null = null;
  settings$: Subscription;
  settings: Settings | null = null;

  constructor(
    private officeService: OfficeService,
    private gistService: GistService,
    private settingsService: SettingsService
  ) {
    this.settings$ = this.settingsService.settings$.subscribe({
      next: this.onSettingsChange.bind(this),
      error: (error) => console.error('error fetching settings!', error),
    });
    this.officeService.registerAction(
      ActionsComponent.INSERT_DEFAULT_GIST_FN_NAME,
      this.insertDefaultGist.bind(this)
    );
  }

  ngOnDestroy() {
    this.settings$.unsubscribe();
  }

  private onSettingsChange(settings: Settings | null) {
    this.settings = settings;
  }

  async insertDefaultGist() {
    const defaultGistId = this.settings?.defaultGistId;
    if (defaultGistId == null) {
      console.error('No default gist selected!');
      await this.openSettingsDialogue();
      return;
    }
    const gistRes = await this.gistService.getGistWithContent(defaultGistId);
    if (gistRes.status === 'ERROR') {
      console.error(
        `Error fetching default gist with id=${defaultGistId}`,
        gistRes.message
      );
      return;
    }
    const htmlContent = getHtmlContent(gistRes.value);
    const res = await this.officeService.setSelectedDataAsHtml(htmlContent);
    if (res.status === 'ERROR') {
      console.error(
        `Error iserting default gist with id=${defaultGistId}`,
        res.message
      );
      return;
    }
  }

  async openSettingsDialogue() {
    const url = addQueryParamToUrl(getAbsoluteUrl('/#/settings'), {
      errorMessage: 'No default gist selected! Please select one.',
    });
    const dialogOption = { width: 40, height: 50, displayInIframe: true };
    const res = await this.officeService.displayDialogAsync(url, dialogOption);
    if (res.status === 'ERROR') {
      console.error(res.message);
      return;
    }
    const settingsDialog = res.value;
    settingsDialog.addEventHandler(
      Office.EventType.DialogMessageReceived,
      async (response) => {
        if ('error' in response) {
          console.error('dialogue message revived error', response.error);
          return;
        }
        const settings = JSON.parse(response.message) as Settings;
        await this.settingsService.updateSettings(settings);
        this.insertDefaultGist();
        settingsDialog.close();
      }
    );
  }
}
