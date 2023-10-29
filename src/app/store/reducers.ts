import { ActionReducerMap } from '@ngrx/store';
import { IAppState, APP_FEATURE_KEY } from './app/app.interface';
import { appReducer } from './app/app.reducer';

export interface IState {
  [APP_FEATURE_KEY]: IAppState;
}

export const reducers: ActionReducerMap<IState> = {
  [APP_FEATURE_KEY]: appReducer,
};
