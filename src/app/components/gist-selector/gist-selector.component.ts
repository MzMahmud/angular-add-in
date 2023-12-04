import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  private _selectedGistId: string | null = null;
  @Input()
  set selectedGistId(value: string | null) {
    this._selectedGistId = value;
    this.selectedGistIdChange.emit(this._selectedGistId);
  }
  get selectedGistId() {
    return this._selectedGistId;
  }
  @Output() selectedGistIdChange = new EventEmitter<string | null>();

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
