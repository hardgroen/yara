import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { UserSessionComponent } from './user-session/user-session.component';

const routes: Routes = [
  Shell.childRoutes([
    // { path: '', redirectTo: '/user-session', pathMatch: 'full' },
    { path: 'user-session', component: UserSessionComponent, data: { title: marker('User session') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
