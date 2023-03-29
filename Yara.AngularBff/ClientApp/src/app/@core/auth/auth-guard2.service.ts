import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { extractParams } from './auth-guard2.helpers';
import { AuthorizePolicies } from './auth.model';
import { AuthorizeService } from './authorize.service';

export interface RouteData {
  authorize?: AuthorizeRouteData;
}

export const createAuthorizeRouteData = (
  policies: AuthorizePolicies[]
): RouteData => ({ authorize: { policies } });

@Injectable({
  providedIn: 'root',
})
export class AuthGuard2Service implements CanActivate, CanActivateChild {
  constructor(
    private store: Store,
    private authorizeService: AuthorizeService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.isAuthorized(route);
  }

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.isAuthorized(childRoute);
  }

  private async isAuthorized(route: ActivatedRouteSnapshot): Promise<boolean> {
    // the required policy is defined in the Angular route data
    const routeData: RouteData = route.data;

    // skip it when no permission is required
    if (!routeData.authorize) {
      return true;
    }

    // extract the authorize policy variables from the route parameters
    const values = extractParams(route.root);

    // interate through the policies and check the user permissions
    for (const policy of routeData.authorize.policies) {
      const isAuthorized = await this.authorizeService
        .isAuthorized(policy, values)
        .toPromise();
      if (!isAuthorized) {
        this.store.dispatch(go({ path: ['/auth', 'unauthorized'] }));
        return false;
      }
    }
    return true;
  }
}
