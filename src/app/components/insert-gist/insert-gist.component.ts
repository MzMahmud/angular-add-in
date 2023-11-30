import { Component, OnInit } from '@angular/core';
import { Gist, getHtmlContent } from '../../models/gist.model';
import { OfficeService } from '../../services/office.service';
import { GistService } from '../../services/gist.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-insert-gist',
  templateUrl: './insert-gist.component.html',
  styleUrl: './insert-gist.component.css',
})
export class InsertGistComponent implements OnInit {
  $gists: Observable<Gist[]> = of();

  selectedGistId: string | null = null;

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

  async insertGist(gistId: string | null) {
    this.errorMessage = null;
    if (gistId == null) {
      this.showError(`No gist is selected!`);
      return;
    }
    const gist = null;
    if (gist == null) {
      this.showError(`Invalid Gist!`);
      return;
    }
    const res = await this.officeService.setSelectedDataAsHtml(
      getHtmlContent(gist)
    );
    if (res.status === 'ERROR') {
      this.showError(res.message);
      return;
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }
}
