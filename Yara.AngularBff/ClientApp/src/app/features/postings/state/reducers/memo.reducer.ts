import { Action, createReducer, on } from '@ngrx/store';
import { Memo } from '../../services/models/memo';
import { MemoApiActions } from '../actions';

export interface MemoState {
  isLoading: boolean;
  error?: string;
  memos: Memo[];
}

export const initialState: MemoState = {
  isLoading: false,
  memos: [],
  error: undefined,
};

const reducer = createReducer<MemoState>(
  initialState,
  on(MemoApiActions.loadMemosSuccess, (state, action): MemoState => {
    return {
      ...state,
      memos: action.memos,
      error: undefined,
      isLoading: false,
    };
  }),
  on(MemoApiActions.loadMemosFailure, (state, action): MemoState => {
    return {
      ...state,
      memos: [],
      error: action.error,
      isLoading: false,
    };
  }),
  on(MemoApiActions.updateMemoSuccess, (state, action): MemoState => {
    const updatedMemos = state.memos?.map((memo) =>
      action.memo.id === memo.id ? action.memo : memo
    );
    return {
      ...state,
      memos: updatedMemos,
      isLoading: false,
      error: undefined,
    };
  }),
  on(MemoApiActions.updateMemoFailure, (state, action): MemoState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(MemoApiActions.createMemoSuccess, (state, action): MemoState => {
    return {
      ...state,
      memos: [...state.memos, action.memo],
      error: undefined,
      isLoading: false,
    };
  }),
  on(MemoApiActions.createMemoFailure, (state, action): MemoState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(MemoApiActions.deleteMemoSuccess, (state, action): MemoState => {
    return {
      ...state,
      memos: state.memos.filter((memo) => memo.id !== action.memoId),
      error: undefined,
      isLoading: false,
    };
  }),
  on(MemoApiActions.deleteMemoFailure, (state, action): MemoState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  })
);

export function memoReducer(
  state: MemoState | undefined,
  action: Action
): MemoState {
  return reducer(state, action);
}
