import { createAction } from '@ngrx/store';

export const checkLoginAtAppStartup = createAction('[App startup] Check login');
export const checkLoginAtAuthGuard = createAction('[Auth guard] Check login');
