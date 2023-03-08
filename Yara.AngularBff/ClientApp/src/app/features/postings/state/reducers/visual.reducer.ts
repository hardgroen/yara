import { Action, createReducer, on } from '@ngrx/store';
import { Visual } from '../../services/models/visual';
import { VisualApiActions } from '../actions';

export interface VisualState {
  isLoading: boolean;
  error?: string;
  visuals: Visual[];
}

export const initialState: VisualState = {
  isLoading: false,
  error: undefined,
  visuals: [],
};

const reducer = createReducer<VisualState>(
  initialState,
  on(VisualApiActions.loadVisualsSuccess, (state, action): VisualState => {
    return {
      ...state,
      visuals: action.visuals,
      error: undefined,
      isLoading: false,
    };
  }),
  on(VisualApiActions.loadVisualsFailure, (state, action): VisualState => {
    return {
      ...state,
      visuals: [],
      error: action.error,
      isLoading: false,
    };
  }),
  on(VisualApiActions.updateVisualSuccess, (state, action): VisualState => {
    const updatedVisuals = state.visuals?.map((visual) =>
      action.visual.id === visual.id ? action.visual : visual
    );
    return {
      ...state,
      visuals: updatedVisuals,
      isLoading: false,
      error: undefined,
    };
  }),
  on(VisualApiActions.updateVisualFailure, (state, action): VisualState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(VisualApiActions.createVisualSuccess, (state, action): VisualState => {
    return {
      ...state,
      visuals: [...state.visuals, action.visual],
      error: undefined,
      isLoading: false,
    };
  }),
  on(VisualApiActions.createVisualFailure, (state, action): VisualState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(VisualApiActions.deleteVisualSuccess, (state, action): VisualState => {
    return {
      ...state,
      visuals: state.visuals.filter((visual) => visual.id !== action.visualId),
      error: undefined,
      isLoading: false,
    };
  }),
  on(VisualApiActions.deleteVisualFailure, (state, action): VisualState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  })
);

export function visualReducer(state: VisualState | undefined, action: Action) {
  return reducer(state, action);
}
