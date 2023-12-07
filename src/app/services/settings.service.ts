/* File: office.service.ts
 * Description: This file manages application settings, such as GitHub username and the ID of the
 * gist added through "Insert default gist". The settings are stored in Office.context.roamingSettings.
 */
import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private static SETTINGS_KEY = 'SettingsService.SETTINGS_KEY';

  settings$ = new BehaviorSubject<Settings | null>(null);

  constructor(private officeService: OfficeService) {
    this.loadSettings();
  }

  loadSettings() {
    const settings = this.officeService.getFromRoamingSettings<Settings>(
      SettingsService.SETTINGS_KEY
    );
    this.settings$.next(settings);
  }

  async updateSettings(settings: Settings) {
    await this.officeService.setToRoamingSettings(
      SettingsService.SETTINGS_KEY,
      settings
    );
    this.loadSettings();
  }

  async clearSettings() {
    await this.officeService.removeToRoamingSettings(
      SettingsService.SETTINGS_KEY
    );
    this.loadSettings();
  }
}
