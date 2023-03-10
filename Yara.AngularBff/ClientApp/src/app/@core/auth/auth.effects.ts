import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { exhaustMap, map, switchMap } from 'rxjs';
import { AuthApiActions, AuthPageActions } from '.';
import { AuthApiService } from './auth-api.service';
import { selectLogoutUrl } from './auth.selectors';
import { AuthState } from './auth.state';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authApiService: AuthApiService,
    private _router: Router,
    private _store: Store<AuthState>
  ) {}

  login$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.authGuardlogin, AuthApiActions.manualLogin),
        map(() =>
          this._router.navigate([
            'externalRedirect',
            { externalUrl: '/bff/login' },
          ])
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.manualLogout),
        exhaustMap(() =>
          this._store
            .pipe(select(selectLogoutUrl))
            .pipe(
              map((logoutUrl) =>
                this._router.navigate([
                  'externalRedirect',
                  { externalUrl: logoutUrl },
                ])
              )
            )
        )
      ),
    { dispatch: false }
  );

  loginCheck$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        AuthPageActions.checkLoginAtAppStartup,
        AuthPageActions.checkLoginAtAuthGuard
      ),
      switchMap(() =>
        this._authApiService
          .getAuthModel()
          .pipe(
            map((authModel) =>
              AuthApiActions.loginCheckCompleted({ authModel })
            )
          )
      )
    )
  );
}
