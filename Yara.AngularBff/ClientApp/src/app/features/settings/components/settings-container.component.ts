import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { actionSettingsChangeTheme } from '@core/settings/settings.actions';
import { SettingsState, State } from '@core/settings/settings.state';
import { selectSettings } from '@core/settings/settings.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsContainerComponent implements OnInit {
  settings$: Observable<SettingsState> | undefined;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onThemeSelect(theme: string) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }
}
