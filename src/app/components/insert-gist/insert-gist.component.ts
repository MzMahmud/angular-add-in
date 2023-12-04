import { Component, NgZone } from '@angular/core';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { Gist, getHtmlContent } from '../../models/gist.model';
import { Settings } from '../../models/settings.model';
import { GistService } from '../../services/gist.service';
import { OfficeService } from '../../services/office.service';
import { SettingsService } from '../../services/settings.service';
import { addQueryParamToUrl, getAbsoluteUrl } from '../../util/string.util';

@Component({
  selector: 'app-insert-gist',
  templateUrl: './insert-gist.component.html',
  styleUrl: './insert-gist.component.css',
})
export class InsertGistComponent {
  $gists: Observable<Gist[]> = of();

  selectedGistId: string | null = null;

  errorMessage: string | null = null;

  private settings: Settings | null = null;

  constructor(
    private officeService: OfficeService,
    private gistService: GistService,
    private settingsService: SettingsService,
    private zone: NgZone
  ) {
    this.$gists = this.settingsService.$settings.pipe(
      mergeMap((settings) => {
        this.settings = settings;
        if (settings == null) {
          this.showError('No github username is set!');
          return of();
        }
        this.hideError();
        return this.gistService.getUserPublicGists(settings.githubUsername);
      }),
      catchError((error) => {
        console.error('error fetching gists', error);
        return of([]);
      })
    );
  }

  async insertGist(gistId: string | null) {
    if (gistId == null) {
      this.showError(`No gist is selected!`);
      return;
    }
    const gistRes = await this.gistService.getGistWithContent(gistId);
    if (gistRes.status === 'ERROR') {
      this.showError(gistRes.message);
      return;
    }
    const htmlContent = getHtmlContent(gistRes.value);
    const res = await this.officeService.setSelectedDataAsHtml(htmlContent);
    if (res.status === 'ERROR') {
      this.showError(res.message);
      return;
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  hideError() {
    this.errorMessage = null;
  }

  async openSettingsDialogue() {
    const url = addQueryParamToUrl(
      getAbsoluteUrl('/#/settings'),
      this.settings ?? {}
    );
    const dialogOption = { width: 40, height: 30, displayInIframe: true };
    const res = await this.officeService.displayDialogAsync(url, dialogOption);
    if (res.status === 'ERROR') {
      this.showError(res.message);
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
        // This needs to trigger UI Update
        // Source: https://learn.microsoft.com/en-us/office/dev/add-ins/develop/add-ins-with-angular2#trigger-the-ui-update
        this.zone.run(async () => {
          await this.settingsService.updateSettings(settings);
          settingsDialog.close();
        });
      }
    );
  }
}
