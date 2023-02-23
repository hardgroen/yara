import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '@app/features/auth/services/authentication.service';
import { AuthApiService } from '@app/@core/auth/auth-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;
  public logoutUrl$ = this._authApiService.getLogoutUrl();
  public username$ = this._authApiService.getUsername();
  public isAuthenticated$ = this._authApiService.getIsAuthenticated();
  public anonymous$ = this._authApiService.getIsAnonymous();

  constructor(
    private _router: Router,
    private _titleService: Title,
    private _authApiService: AuthApiService
  ) {}

  // logout() {
  //   const logoutUrl$ = this._authenticationService.getLogoutUrl();
  //   this._authenticationService.logout().subscribe(() => this._router.navigate(['/login'], { replaceUrl: true }));
  // }

  // get username(): string | null {
  //   const username = this._authenticationService.getUsername();
  //   return username ?? username : null;
  // }

  get title(): string {
    return this._titleService.getTitle();
  }

  onLoginClick(): void {
    console.log('login');
  }

  onLogoutClick(): void {
    console.log('logout');
    this._authApiService.getLogoutUrl(false).pipe(
      map((result) => {
        if (result !== null) {
          return true;
        } else {
          this._logger.debug(
            'Not authenticated, redirecting and adding redirect url...'
          );
          this._router.navigate(['/bff/login'], {
            queryParams: { redirect: state.url },
            replaceUrl: true,
          });
          return false;
        }
      })
    this._authApiService.subscribe(() => this._router.navigate(['/login'], { replaceUrl: true }));
  }
}
