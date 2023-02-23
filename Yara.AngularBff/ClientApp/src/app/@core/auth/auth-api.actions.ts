import { createAction } from '@ngrx/store';

export const authApiLoginSuccess = createAction('[Auth API] Login success');
export const authApiLoginFailure = createAction('[Auth API] Login failure');
export const authApiLogoutSuccess = createAction('[Auth API] Logout success');
export const authApiLogoutFailure = createAction('[Auth API] Logout failure');
