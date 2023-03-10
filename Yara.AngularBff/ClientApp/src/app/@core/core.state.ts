import {} from '@app/features/postings/state/reducers/link.reducer';
import {} from '@app/features/postings/state/reducers/memo.reducer';
import {} from '@app/features/postings/state/reducers/visual.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.state';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  auth: authReducer,
};

export const selectSettingsState =
  createFeatureSelector<SettingsState>('settings');

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export interface AppState {
  settings: SettingsState;
  auth: AuthState;
}
