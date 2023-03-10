import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../core.state';
import { AuthState } from './auth.state';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.userName
);

export const selectLogoutUrl = createSelector(
  selectAuthState,
  (state: AuthState) => state.logoutUrl
);

export const selectClaims = createSelector(
  selectAuthState,
  (state: AuthState) => state.claims
);
