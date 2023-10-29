import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { IAppState } from './app.interface';

const initialState: IAppState = {
  user: null,
};

// prettier-ignore
export const appReducer = createReducer(
  initialState,
  on(AppActions.SetUser, (state, { payload }): IAppState => ({ ...state, user: payload })),
);
