import { AppState } from '../core.state';
import {
  selectAuth,
  selectClaims,
  selectIsAuthenticated,
  selectLogoutUrl,
  selectUserName,
} from './auth.selectors';

describe('Auth Selectors', () => {
  it('selectAuth', () => {
    const state = createAuthState();
    expect(selectAuth(state)).toBe(state.auth);
  });

  it('selectIsAuthenticated', () => {
    const state = createAuthState();
    expect(selectIsAuthenticated(state)).toBe(false);
  });

  it('selectUserName', () => {
    const state = createAuthState();
    expect(selectUserName(state)).toBe(state.auth.userName);
  });

  it('selectLogoutUrl', () => {
    const state = createAuthState();
    expect(selectLogoutUrl(state)).toBe(state.auth.logoutUrl);
  });

  it('selectClaims', () => {
    const state = createAuthState();
    expect(selectClaims(state)).toEqual(state.auth.claims);
  });
});

function createAuthState(): AppState {
  return {
    auth: {
      isAuthenticated: false,
      userName: 'bob smith',
      logoutUrl: 'http://logout',
      claims: [],
    },
    settings: {} as any,
  };
}
