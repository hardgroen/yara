import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared';
import { CoreModule } from './@core';

import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // yara
    SharedModule,
    CoreModule,
    ShellModule,

    // app
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
