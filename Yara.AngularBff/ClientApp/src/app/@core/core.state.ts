import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.state';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  settings: settingsReducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectSettingsState =
  createFeatureSelector<SettingsState>('settings');

export interface AppState {
  auth: AuthState;
  settings: SettingsState;
}
