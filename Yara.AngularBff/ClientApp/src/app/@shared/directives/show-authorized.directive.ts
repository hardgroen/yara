import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { extractParams, addParams } from '@app/@core/auth/auth-guard2.helpers';
import { Store, select } from '@ngrx/store';
import { Subject, scan, filter, map, mergeMap, takeUntil } from 'rxjs';

export interface AuthorizeOptions {
  values: { [index: string]: string };
}

/*
<div *appShowAuthorize="'EMPLOYEE_READ'; options: { values: { employeeId: specificEmployeeId } }">
    <......></......>
</div>
*/

@Directive({ selector: '[appShowAuthorized]' })
export class ShowAuthorizedDirective implements OnInit, OnDestroy {
  @Input('appShowAuthorized') authorizePolicies: AuthorizePolicies;
  @Input() appShowAuthorizedOptions: AuthorizeOptions = new AuthorizeOp();

  private unsubscribe$ = new Subject();

  constructor(
    private authorizeService: AuthorizeService,
    private store$: Store<RootState>,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (!this.authorizePolicies) {
      this.viewContainer.clear();
      return;
    }

    this.store$
      .pipe(
        select((state) => state.router),
        // prevent the directive to get a different route config than the initial one on navigating away
        scan((acc: RouterReducerState<SerializedRouterStateSnapshot>, val) => {
          if (!acc || routeConfigEquals(acc.state.root, val.state.root)) {
            return val;
          }

          return acc;
        }, <RouterReducerState<SerializedRouterStateSnapshot>>null),
        filter((router) => !!router),
        map((router) => extractParams(router.state.root)),
        map((params) =>
          addParams(params, this.appShowAuthorizedOptions?.values)
        ),
        mergeMap((params) =>
          this.authorizeService.isAuthorized(this.authorizePolicies, params)
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((isAuthorized) => {
        if (isAuthorized) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
