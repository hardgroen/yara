import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { Logger } from '../logging/logger.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private _logger = new Logger('AuthGuardService');
  constructor(
    private _router: Router,
    private _authApiService: AuthApiService
  ) {}

  // possible endless redirect loop?
  canActivate() {
    return this._authApiService.getIsAuthenticated(false).pipe(
      tap((isAuthenticated) => this._logger.debug('result', isAuthenticated)),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this._logger.debug(
            'Not authenticated, redirecting and adding redirect url...'
          );
          this._router.navigate(
            ['externalRedirect', { externalUrl: '/bff/login' }],
            {
              replaceUrl: true,
            }
          );
          return false;
        }
      })
    );
  }
}
