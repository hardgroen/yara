import { AppState } from '../core.state';

export const NIGHT_MODE_THEME = 'DARK-THEME';

export interface SettingsState {
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
