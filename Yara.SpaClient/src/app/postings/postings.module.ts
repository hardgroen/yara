import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostingsComponent } from './components/list-postings/list-postings.component';
import { PostingsRoutingModule } from './postings-routing.module';

@NgModule({
  declarations: [ListPostingsComponent],
  imports: [CommonModule, PostingsRoutingModule],
})
export class PostingsModule {}
