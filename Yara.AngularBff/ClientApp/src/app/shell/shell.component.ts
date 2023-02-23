import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AppState } from '@app/@core';
import { select, Store } from '@ngrx/store';
import { selectEffectiveTheme } from '@app/@core/settings/settings.selectors';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  theme$: Observable<string> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }
}
