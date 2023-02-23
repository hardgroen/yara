import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoListComponent } from './components/memo-list/memo-list.component';
import { PostingsRoutingModule } from './postings-routing.module';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/@shared/material.module';

@NgModule({
  declarations: [MemoListComponent],
  imports: [CommonModule, SharedModule, MaterialModule, PostingsRoutingModule],
})
export class PostingsModule {}
