import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InsertGistComponent } from './components/insert-gist/insert-gist.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, InsertGistComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
