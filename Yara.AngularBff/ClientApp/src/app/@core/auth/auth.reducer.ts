import { Action, createReducer, on } from '@ngrx/store';
import { AuthApiActions } from '.';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  isAuthenticated: false,
  userName: undefined,
  logoutUrl: undefined,
  claims: [],
};

const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginCheckCompleted, (state, action): AuthState => {
    return {
      ...state,
      isAuthenticated: action.authModel.isAuthenticated,
      userName: action.authModel.userName,
      logoutUrl: action.authModel.logoutUrl,
      claims: action.authModel.claims,
    };
  })
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
