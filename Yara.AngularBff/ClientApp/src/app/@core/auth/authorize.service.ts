import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map, first } from 'rxjs';
import {
  AuthorizePolicies,
  Permission,
  AuthorizePolicy,
  RequiredPermission,
} from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  constructor(private http: HttpClient, private store$: Store) {}

  public isAuthorized(
    policyName: AuthorizePolicies,
    values: Map<string, string>
  ): Observable<boolean> {
    return combineLatest([
      this.store$.pipe(select(selectResourcePermissions)),
      this.store$.pipe(select(selectAuthorizationPolicies)),
    ]).pipe(
      // check if the permissions have been loaded
      filter(
        ([permissions]) =>
          permissions.status === 'SUCCEEDED' || permissions.status === 'FAILED'
      ),

      // get the policy with the provided key
      map(([permissions, policies]) => {
        if (!policies.some((p) => p.name === policyName)) {
          throw new Error(`No policy with name '${policyName}' has been found`);
        }

        return {
          permissions,
          policy: policies.find((p) => p.name === policyName),
        };
      }),

      // check if the user is authorized
      map(({ permissions, policy }) =>
        this.authorizeUser(permissions.data, policy, values)
      ),
      first()
    );
  }

  private authorizeUser(
    permissions: Permission[],
    policy: AuthorizePolicy,
    values: Map<string, string>
  ): boolean {
    const isAuthorized =
      policy.permissions
        // replace variables in the policy
        .map((p) =>
          AuthorizeService.substitutePermission(policy.name, p, values)
        )

        // check policies against the permissions
        .map((p) => this.hasPermission(permissions, p))

        // are all required permissions granted?
        .findIndex((granted) => !granted) < 0;

    return isAuthorized;
  }

  private static substitutePermission(
    policy: string,
    permission: RequiredPermission,
    values: Map<string, string>
  ): RequiredPermission {
    return {
      ...permission,
      resourceId: permission.resourceId.map((r) => {
        if (/^{.*}/g.test(r)) {
          const variableName = r.replace('{', '').replace('}', '');
          if (!values.has(variableName)) {
            throw new Error(
              `A value for the variable '${variableName}' is missing for policy ${policy}.`
            );
          }
          return values.get(variableName);
        }
        return r;
      }),
    };
  }

  private hasPermission(
    permissions: Permission[],
    requiredPermission: RequiredPermission
  ): boolean {
    // check the every user permission if it matches the required permission
    const hasPermission =
      permissions
        .map((p) => AuthorizeService.matchPermission(p, requiredPermission))
        .findIndex((matched) => matched) >= 0;

    return hasPermission;
  }

  private static matchPermission(
    permission: Permission,
    requiredPermission: RequiredPermission
  ): boolean {
    if (
      permission.actions.findIndex((a) => a === requiredPermission.action) < 0
    ) {
      return false;
    }
    for (let i = 0; i < requiredPermission.resourceId.length; i++) {
      if (permission.resourceId.length <= i) {
        return false;
      }
      if (permission.resourceId[i] === '**') {
        return true;
      }
      if (
        permission.resourceId[i] !== '*' &&
        permission.resourceId[i] !== requiredPermission.resourceId[i]
      ) {
        return false;
      }
    }
    if (permission.resourceId.length !== requiredPermission.resourceId.length) {
      return false;
    }
    return true;
  }
}
