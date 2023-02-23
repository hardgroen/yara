import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserModule } from '@app/features/user/user.module';
import { ShellComponent } from './shell.component';
import { SharedModule } from '@app/@shared';
import { HomeModule } from '@app/features/home/home.module';
import { PostingsModule } from '@app/features/postings/postings.module';
import { SettingsModule } from '@app/features/settings/settings.module';

@NgModule({
  declarations: [HeaderComponent, ShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    SharedModule,
    HomeModule,
    PostingsModule,
    SettingsModule,
  ],
  exports: [HomeModule, PostingsModule, SettingsModule, UserModule],
})
export class ShellModule {}
