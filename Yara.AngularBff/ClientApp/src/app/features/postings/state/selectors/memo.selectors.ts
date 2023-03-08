import { createSelector } from '@ngrx/store';
import { selectPostingsFeatureState } from '../postings.state';

export const getMemos = createSelector(
  selectPostingsFeatureState,
  (state) => state.memoState.memos
);
