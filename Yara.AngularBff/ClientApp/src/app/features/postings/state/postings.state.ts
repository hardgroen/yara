import { AppState } from '@app/@core';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { linkReducer, LinkState } from './reducers/link.reducer';
import { memoReducer, MemoState } from './reducers/memo.reducer';
import { visualReducer, VisualState } from './reducers/visual.reducer';

export const FEATURE_NAME = 'postings';

export const selectPostingsFeatureState =
  createFeatureSelector<PostingsState>(FEATURE_NAME);

export const reducers: ActionReducerMap<PostingsState> = {
  memoState: memoReducer,
  linkState: linkReducer,
  visualState: visualReducer,
};

export interface PostingsState {
  memoState: MemoState;
  linkState: LinkState;
  visualState: VisualState;
}

export interface State extends AppState {
  postings: PostingsState;
}
