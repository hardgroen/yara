import { Claim } from './auth.model';

export interface AuthState {
  isAuthenticated: boolean;
  userName: string | undefined;
  logoutUrl: string | undefined;
  claims: Claim[];
}
