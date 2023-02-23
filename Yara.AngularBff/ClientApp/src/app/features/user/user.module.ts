import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { UserContainerComponent } from './components/user-container.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserSessionComponent, UserContainerComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
