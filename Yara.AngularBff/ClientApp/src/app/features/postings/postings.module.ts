import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingsRoutingModule } from './postings-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListPostingsComponent } from './components/list-postings/list-postings.component';

@NgModule({
  declarations: [ListPostingsComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, PostingsRoutingModule],
})
export class PostingsModule {}
