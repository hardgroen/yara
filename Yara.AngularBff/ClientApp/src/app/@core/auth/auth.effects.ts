import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthApiService } from './auth-api.service';
import { AuthActions } from '.';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _authService: AuthApiService
  ) {}

  logout = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.authLogout),
        tap(() => {
          this._router.navigate(['/bff/logout'], {
            queryParams: { redirect: '/home' },
            replaceUrl: true,
          });
        })
      ),
    { dispatch: false }
  );
}
