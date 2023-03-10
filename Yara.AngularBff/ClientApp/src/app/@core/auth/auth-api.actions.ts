import { createAction, props } from '@ngrx/store';
import { AuthModel } from './auth.model';

export const loginCheckCompleted = createAction(
  '[Auth API] login check completed',
  props<{ authModel: AuthModel }>()
);

export const authGuardlogin = createAction(
  '[AuthGuard Login] login via authguard'
);

export const manualLogin = createAction('[Manual Login] logging in');
export const manualLogout = createAction('[Manual Logout] logging out');
