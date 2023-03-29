export type PermissionAction =
  | 'Read'
  | 'Write'
  | 'ReadRestricted'
  | 'ReadConfidential';

export type AuthorizePolicies = 'POSTINGS-READ' | 'POSTINGS-WRITE';

export interface Permission {
  resourceId: string[];
  actions: PermissionAction[];
}

export interface AuthorizePolicy {
  name: AuthorizePolicies;
  permissions: RequiredPermission[];
}

export interface RequiredPermission {
  resourceId: string[];
  action: PermissionAction;
}

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
