import { InjectionToken, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { NotFoundComponent } from './@shared/components/not-found/not-found.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  // Fallback when no prior route is matched
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        if (externalUrl) {
          window.open(externalUrl, '_self');
        }
      },
    },
  ],
})
export class AppRoutingModule {}
