import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { InsertGistComponent } from './components/insert-gist/insert-gist.component';
import { ActionsComponent } from './components/actions/actions.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'insert-gist',
    component: InsertGistComponent,
  },
  {
    path: 'actions',
    component: ActionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
