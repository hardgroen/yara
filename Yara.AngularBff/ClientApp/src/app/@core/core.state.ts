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
