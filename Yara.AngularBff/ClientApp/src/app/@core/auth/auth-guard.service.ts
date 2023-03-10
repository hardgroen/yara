import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Logger } from '../logging/logger.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectIsAuthenticated } from './auth.selectors';
import { AuthApiActions } from '.';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private _logger = new Logger('AuthGuardService');
  private isAuthenticated$: Observable<boolean>;

  constructor(private _store: Store<AuthState>) {
    this.isAuthenticated$ = this._store.pipe(select(selectIsAuthenticated));
  }

  canActivate() {
    return this.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this._store.dispatch(AuthApiActions.authGuardlogin());
          return false;
        }
      })
    );
  }
}
