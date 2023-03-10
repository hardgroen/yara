import { createAction, props } from '@ngrx/store';
import { Memo } from '../../services/models/memo';

export const loadMemosSuccess = createAction(
  '[Memo API] Load Success',
  props<{ memos: Memo[] }>()
);

export const loadMemosFailure = createAction(
  '[Memo API] Load Failure',
  props<{ error: string }>()
);

export const updateMemoSuccess = createAction(
  '[Memo API] Update Memo Success',
  props<{ memo: Memo }>()
);

export const updateMemoFailure = createAction(
  '[Memo API] Update Memo Failure',
  props<{ error: string }>()
);

export const createMemoSuccess = createAction(
  '[Memo API] Create Memo Success',
  props<{ memo: Memo }>()
);

export const createMemoFailure = createAction(
  '[Memo API] Create Memo Fail',
  props<{ error: string }>()
);

export const deleteMemoSuccess = createAction(
  '[Memo API] Delete Memo Success',
  props<{ memoId: number }>()
);

export const deleteMemoFailure = createAction(
  '[Memo API] Delete Memo Fail',
  props<{ error: string }>()
);
