import { Title } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Logger } from '@app/@core/logging/logger.service';
import { AppState } from '@app/@core';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '@app/@core/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;
  @Input() logoutUrl: string | null | undefined = undefined;
  @Input() isAuthenticated: boolean | null = false;
  @Input() userName: string | null | undefined = undefined;

  private _logger = new Logger('[Header]');

  constructor(private _titleService: Title, private _store: Store<AppState>) {}

  get title(): string {
    return this._titleService.getTitle();
  }

  loginClick() {
    this._store.dispatch(AuthApiActions.manualLogin());
  }

  logoutClick() {
    this._store.dispatch(AuthApiActions.manualLogout());
  }
}
