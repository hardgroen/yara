import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { environment } from '@env/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SettingsEffects } from './settings/settings.effects';
import { reducers } from './core.state';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule } from '@angular/forms';
import { CsrfHeaderInterceptor } from './http-interceptors/csrf-header.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './http-interceptors/error-handler.interceptor';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([SettingsEffects, AuthEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material Starter',
        }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  exports: [
    // angular
    FormsModule,
  ],
})
export class CoreModule {}
