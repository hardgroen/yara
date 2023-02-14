import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  public logoutUrl$ = this._authenticationService.getLogoutUrl();
  public username$ = this._authenticationService.getUsername();
  public isAuthenticated$ = this._authenticationService.getIsAuthenticated();
  public anonymous$ = this._authenticationService.getIsAnonymous();

  constructor(
    private _router: Router,
    private _titleService: Title,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

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
}
