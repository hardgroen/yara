import { InjectionToken, NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ActivatedRouteSnapshot } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NotFoundComponent } from './not-found.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) }]),
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    // We need a component here because we cannot define the route otherwise
    component: NotFoundComponent,
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl ?? '', '_self');
      },
    },
  ],
})
export class AppRoutingModule {}
