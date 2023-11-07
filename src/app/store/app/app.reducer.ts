import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { IAppState } from './app.interface';

const initialState: IAppState = {
  profile: null,
  homepage: null,
};

// prettier-ignore
export const appReducer = createReducer(
  initialState,
  on(AppActions.SetProfile, (state, { payload }): IAppState =>({ ...state, profile: payload })),
  on(AppActions.PatchProfile, (state, { payload }): IAppState =>({ ...state, profile: { ...state.profile, ...payload } })),
  on(AppActions.SetHomepage, (state, { payload }): IAppState => ({ ...state, homepage: payload })),
);
