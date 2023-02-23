import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { SettingsContainerComponent } from './components/settings-container.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/settings', pathMatch: 'full' },
    {
      path: 'settings',
      component: SettingsContainerComponent,
      data: { title: 'Select your UI them' },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
