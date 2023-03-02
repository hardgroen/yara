import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { Logger } from '../logging/logger.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private _logger = new Logger('myFile');
  constructor(
    private _router: Router,
    private _authApiService: AuthApiService
  ) {}

  // possible endless redirect loop?
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._logger.debug('in auth guard');
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
              queryParams: { redirect: state.url },
              replaceUrl: true,
            }
          );
          return false;
        }
      })
    );
  }
}
