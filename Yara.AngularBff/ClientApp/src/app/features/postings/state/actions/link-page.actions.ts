import { createAction, props } from '@ngrx/store';
import { Link } from '../../services/models/link';

export const loadLinks = createAction('[Link Page] Load');

export const updateLink = createAction(
  '[Link Page] UpdateLink',
  props<{ link: Link }>()
);

export const createLink = createAction(
  '[Link Page] CreateLink',
  props<{ link: Link }>()
);

export const deleteLink = createAction(
  '[Link Page] DeleteLink',
  props<{ linkId: number }>()
);
