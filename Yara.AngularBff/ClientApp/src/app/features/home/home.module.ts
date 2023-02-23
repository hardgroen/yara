import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/@shared/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
