import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AppState } from '@app/@core';
import { select, Store } from '@ngrx/store';
import { selectEffectiveTheme } from '@app/@core/settings/settings.selectors';
import { AuthApiService } from '@app/@core/auth/auth-api.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  theme$: Observable<string> | undefined;
  logoutUrl$: Observable<string | undefined>;

  constructor(
    private _store: Store<AppState>,
    private _authApiService: AuthApiService
  ) {
    this.theme$ = this._store.pipe(select(selectEffectiveTheme));
    this.logoutUrl$ = this._authApiService.getLogoutUrl();
  }
}
