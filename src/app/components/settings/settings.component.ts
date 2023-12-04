import { Component, OnDestroy } from '@angular/core';
import { OfficeService } from '../../services/office.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnDestroy {
  githubUsername: string | null = null;
  private queryParamMap$: Subscription;

  constructor(
    private officeService: OfficeService,
    private route: ActivatedRoute
  ) {
    this.queryParamMap$ = this.route.queryParamMap.subscribe(
      (queryParamMap) => {
        this.githubUsername = queryParamMap.get('githubUsername');
      }
    );
  }

  ngOnDestroy() {
    this.queryParamMap$.unsubscribe();
  }

  saveSettings() {
    if (!this.isSettingsValid()) {
      return;
    }
    const settings = { githubUsername: this.githubUsername };
    // IMPORTANT: this code is run is seperate dialogoue.
    // Don't expect to make chnages to this and that change gets affected on the original app!
    // Send message to parent and load settings there.
    this.officeService.messageParent(JSON.stringify(settings));
  }

  isSettingsValid() {
    return this.githubUsername != null && this.githubUsername != '';
  }
}
