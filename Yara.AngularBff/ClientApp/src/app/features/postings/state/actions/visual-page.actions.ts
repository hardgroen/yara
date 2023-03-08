import { createAction, props } from '@ngrx/store';
import { Visual } from '../../services/models/visual';

export const loadVisuals = createAction('[Visual Page] Load');

export const updateVisual = createAction(
  '[Visual Page] Update Visual',
  props<{ visual: Visual }>()
);

export const createVisual = createAction(
  '[Visual Page] Create Visual',
  props<{ visual: Visual }>()
);

export const deleteVisual = createAction(
  '[Visual Page] Delete Visual',
  props<{ visualId: number }>()
);
