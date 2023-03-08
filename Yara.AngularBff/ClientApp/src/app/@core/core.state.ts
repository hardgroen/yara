import {} from '@app/features/postings/state/reducers/link.reducer';
import {} from '@app/features/postings/state/reducers/memo.reducer';
import {} from '@app/features/postings/state/reducers/visual.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.state';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
};

export const selectSettingsState =
  createFeatureSelector<SettingsState>('settings');

export interface AppState {
  settings: SettingsState;
}
