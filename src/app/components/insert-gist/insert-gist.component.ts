import { Component, OnInit } from '@angular/core';
import { Gist, getHtmlContent } from '../../models/gist.model';
import { OfficeService } from '../../services/office.service';
import { GistService } from '../../services/gist.service';
import { Observable, catchError, of } from 'rxjs';
import { getAbsoluteUrl } from '../../util/string.util';

@Component({
  selector: 'app-insert-gist',
  templateUrl: './insert-gist.component.html',
  styleUrl: './insert-gist.component.css',
})
export class InsertGistComponent implements OnInit {
  $gists: Observable<Gist[]> = of();

  selectedGist: Gist | null = null;

  errorMessage: string | null = null;

  constructor(
    private officeService: OfficeService,
    private gistService: GistService
  ) {}

  ngOnInit() {
    this.$gists = this.gistService.getUserPublicGists('MzMahmud').pipe(
      catchError((e) => {
        console.log('error', e);
        return of();
      })
    );
  }

  async insertGist(gist: Gist | null) {
    if (gist == null) {
      this.showError(`No gist is selected!`);
      return;
    }
    const content = await this.gistService.getContent(gist);
    const htmlContent = getHtmlContent(gist, content);
    const res = await this.officeService.setSelectedDataAsHtml(htmlContent);
    if (res.status === 'ERROR') {
      this.showError(res.message);
      return;
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  async openSettingsDialogue() {
    const res = await this.officeService.displayDialogAsync(
      getAbsoluteUrl('/#/settings'),
      { width: 50, height: 30, displayInIframe: true }
    );
    if (res.status === 'ERROR') {
      this.showError(res.message);
      return;
    }
    const settingsDialog = res.value;
    settingsDialog.addEventHandler(
      Office.EventType.DialogMessageReceived,
      (m) => {
        console.warn(m);
        settingsDialog.close();
      }
    );
    settingsDialog.addEventHandler(
      Office.EventType.DialogEventReceived,
      console.warn
    );
  }
}
