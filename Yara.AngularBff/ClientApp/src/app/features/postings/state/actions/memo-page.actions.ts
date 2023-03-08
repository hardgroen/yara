import { createAction, props } from '@ngrx/store';
import { Memo } from '../../services/models/memo';

export const loadMemos = createAction('[Memo Page] Load');

export const updateMemo = createAction(
  '[Memo Page] Update Memo',
  props<{ memo: Memo }>()
);

export const createMemo = createAction(
  '[Memo Page] Create Memo',
  props<{ memo: Memo }>()
);

export const deleteMemo = createAction(
  '[Memo Page] Delete Memo',
  props<{ memoId: number }>()
);
