import { Title } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthApiService } from '@app/@core/auth/auth-api.service';
import { Logger } from '@app/@core/logging/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;
  @Input() logoutUrl: string | null | undefined = undefined;
  public username$ = this._authApiService.getUsername();
  public isAuthenticated$ = this._authApiService.getIsAuthenticated();
  public anonymous$ = this._authApiService.getIsAnonymous();
  private _logger = new Logger('[Header]');

  constructor(
    private _titleService: Title,
    private _authApiService: AuthApiService
  ) {}

  get title(): string {
    return this._titleService.getTitle();
  }
}
