import { createAction, props } from '@ngrx/store';
import { Link } from '../../services/models/link';

export const loadLinksSuccess = createAction(
  '[Link API] Load Success',
  props<{ links: Link[] }>()
);

export const loadLinksFailure = createAction(
  '[Link API] Load Failure',
  props<{ error: string }>()
);

export const updateLinkSuccess = createAction(
  '[Link API] Update Link Success',
  props<{ link: Link }>()
);

export const updateLinkFailure = createAction(
  '[Link API] Update Link Failure',
  props<{ error: string }>()
);

export const createLinkSuccess = createAction(
  '[Link API] Create Link Success',
  props<{ link: Link }>()
);

export const createLinkFailure = createAction(
  '[Link API] Create Link Fail',
  props<{ error: string }>()
);

export const deleteLinkSuccess = createAction(
  '[Link API] Delete Link Success',
  props<{ linkId: number }>()
);

export const deleteLinkFailure = createAction(
  '[Link API] Delete Link Fail',
  props<{ error: string }>()
);
