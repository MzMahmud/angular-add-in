import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { InsertGistComponent } from './components/insert-gist/insert-gist.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'insert-gist',
    component: InsertGistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
