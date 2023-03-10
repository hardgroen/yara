import { AuthApiActions } from '.';
import { AuthModel } from './auth.model';
import { authReducer, initialState } from './auth.reducer';
import { AuthState } from './auth.state';

describe('AuthReducer', () => {
  const TEST_INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    userName: undefined,
    logoutUrl: undefined,
    claims: [],
  };

  it('should return default state', () => {
    const action = {} as any;
    const state = authReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set auth details as auth state on login check completed', () => {
    const authModel: AuthModel = {
      isAuthenticated: true,
      userName: 'bob smith',
      logoutUrl: '',
      claims: [{ type: 'foo', value: 'bar' }],
    };
    const action = AuthApiActions.loginCheckCompleted({ authModel });
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state).toEqual(authModel);
  });
});
