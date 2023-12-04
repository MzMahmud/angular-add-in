import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gist } from '../../models/gist.model';
import { GistService } from '../../services/gist.service';

@Component({
  selector: 'app-gist-selector',
  templateUrl: './gist-selector.component.html',
  styleUrl: './gist-selector.component.css',
})
export class GistSelectorComponent {
  gists$: Observable<Gist[]> = of();
  selectedGistId: string | null = null;

  private _githubUsername: string | null = null;
  @Input()
  set githubUsername(value: string | null) {
    this._githubUsername = value;
    if (this._githubUsername == null) {
      this.gists$ = of([]);
    } else {
      this.gists$ = this.gistService.getUserPublicGists(this._githubUsername);
    }
  }
  get githubUsername() {
    return this._githubUsername;
  }

  constructor(private gistService: GistService) {}
}
