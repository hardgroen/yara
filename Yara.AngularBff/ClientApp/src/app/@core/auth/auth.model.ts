export interface AuthModel {
  isAuthenticated: boolean;
  userName: string | undefined;
  logoutUrl: string | undefined;
  claims: Claim[];
}

export interface Claim {
  type: string;
  value: string;
}

export type Session = Claim[] | null;
