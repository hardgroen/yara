import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { UserContainerComponent } from './components/user-container.component';

@NgModule({
  declarations: [UserSessionComponent, UserContainerComponent],
  imports: [CommonModule],
})
export class AuthModule {}
