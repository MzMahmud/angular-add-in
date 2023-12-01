import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  clicked = 0;
  sendMessage() {
    Office.context.ui.messageParent('hello');
    this.clicked++;
  }
}
