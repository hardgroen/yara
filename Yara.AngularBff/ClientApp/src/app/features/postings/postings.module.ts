import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoListComponent } from './components/memo-list/memo-list.component';
import { PostingsRoutingModule } from './postings-routing.module';
import { SharedModule } from '@app/@shared';
import { MaterialModule } from '@app/@shared/material.module';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, reducers } from './state/postings.state';
import { EffectsModule } from '@ngrx/effects';
import { MemoEffects } from './state/effects/memo.effects';

@NgModule({
  declarations: [MemoListComponent],
  imports: [
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([MemoEffects]),
    CommonModule,
    SharedModule,
    MaterialModule,
    PostingsRoutingModule,
  ],
})
export class PostingsModule {}
