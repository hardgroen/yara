import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemoListComponent } from './components/memo-list/memo-list.component';
import { Shell } from '@app/shell/shell.service';
import { AuthGuardService } from '@app/@core/auth/auth-guard.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/postings', pathMatch: 'full' },
    {
      path: 'postings',
      component: MemoListComponent,
      data: { title: 'Recent postings' },
      canActivate: [AuthGuardService],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostingsRoutingModule {}
