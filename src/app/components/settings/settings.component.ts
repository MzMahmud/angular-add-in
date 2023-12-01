import { Component } from '@angular/core';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  githubUsername: string | null = null;

  constructor(private officeService: OfficeService) {}

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
