import { Action, createReducer, on } from '@ngrx/store';
import { Link } from '../../services/models/link';
import { LinkApiActions } from '../actions';

export interface LinkState {
  isLoading: boolean;
  error?: string;
  links: Link[];
}

export const initialState: LinkState = {
  isLoading: false,
  links: [],
  error: undefined,
};

const reducer = createReducer<LinkState>(
  initialState,
  on(LinkApiActions.loadLinksSuccess, (state, action): LinkState => {
    return {
      ...state,
      links: action.links,
      error: undefined,
      isLoading: false,
    };
  }),
  on(LinkApiActions.loadLinksFailure, (state, action): LinkState => {
    return {
      ...state,
      links: [],
      error: action.error,
      isLoading: false,
    };
  }),
  on(LinkApiActions.updateLinkSuccess, (state, action): LinkState => {
    const updatedLinks = state.links?.map((link) =>
      action.link.id === link.id ? action.link : link
    );
    return {
      ...state,
      links: updatedLinks,
      isLoading: false,
      error: undefined,
    };
  }),
  on(LinkApiActions.updateLinkFailure, (state, action): LinkState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(LinkApiActions.createLinkSuccess, (state, action): LinkState => {
    return {
      ...state,
      links: [...state.links, action.link],
      error: undefined,
      isLoading: false,
    };
  }),
  on(LinkApiActions.createLinkFailure, (state, action): LinkState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),
  on(LinkApiActions.deleteLinkSuccess, (state, action): LinkState => {
    return {
      ...state,
      links: state.links.filter((link) => link.id !== action.linkId),
      error: undefined,
      isLoading: false,
    };
  }),
  on(LinkApiActions.deleteLinkFailure, (state, action): LinkState => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  })
);

export function linkReducer(
  state: LinkState | undefined,
  action: Action
): LinkState {
  return reducer(state, action);
}
