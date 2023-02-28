import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { UserContainerComponent } from './components/user-container.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@app/@shared';

@NgModule({
  declarations: [UserSessionComponent, UserContainerComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
