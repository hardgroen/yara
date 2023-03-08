import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Visual } from '../../services/models/visual';

export const loadVisualsSuccess = createAction(
  '[Visual API] Load Success',
  props<{ visuals: Visual[] }>()
);

export const loadVisualsFailure = createAction(
  '[Visual API] Load Failure',
  props<{ error: string }>()
);

export const updateVisualSuccess = createAction(
  '[Visual API] Update Visual Success',
  props<{ visual: Visual }>()
);

export const updateVisualFailure = createAction(
  '[Visual API] Update Visual Failure',
  props<{ error: string }>()
);

export const createVisualSuccess = createAction(
  '[Visual API] Create Visual Success',
  props<{ visual: Visual }>()
);

export const createVisualFailure = createAction(
  '[Visual API] Create Visual Fail',
  props<{ error: string }>()
);

export const deleteVisualSuccess = createAction(
  '[Visual API] Delete Visual Success',
  props<{ visualId: number }>()
);

export const deleteVisualFailure = createAction(
  '[Visual API] Delete Visual Fail',
  props<{ error: string }>()
);
