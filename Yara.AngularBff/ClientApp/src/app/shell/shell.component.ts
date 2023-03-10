import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AppState } from '@app/@core';
import { select, Store } from '@ngrx/store';
import { selectEffectiveTheme } from '@app/@core/settings/settings.selectors';
import { AuthPageActions } from '@app/@core/auth';
import {
  selectIsAuthenticated,
  selectLogoutUrl,
  selectUserName,
} from '@app/@core/auth/auth.selectors';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  theme$: Observable<string> | undefined;
  logoutUrl$: Observable<string | undefined>;
  userName$: Observable<string | undefined>;
  isAuthenticated$: Observable<boolean>;

  constructor(private _store: Store<AppState>) {
    this.theme$ = this._store.pipe(select(selectEffectiveTheme));
    this.logoutUrl$ = this._store.pipe(select(selectLogoutUrl));
    this.userName$ = this._store.pipe(select(selectUserName));
    this.isAuthenticated$ = this._store.pipe(select(selectIsAuthenticated));
  }
  ngOnInit(): void {
    this._store.dispatch(AuthPageActions.checkLoginAtAppStartup());
  }
}
