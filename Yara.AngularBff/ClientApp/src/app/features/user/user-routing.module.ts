import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { UserSessionComponent } from './components/user-session/user-session.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/user', pathMatch: 'full' },
    {
      path: 'user',
      component: UserSessionComponent,
      data: { title: 'Recent postings' },
      canActivate: [],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserRoutingModule {}
