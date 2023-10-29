import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, IAppState } from './app.interface';

const selectAppState = createFeatureSelector<IAppState>(APP_FEATURE_KEY);

// prettier-ignore
const selectUser = createSelector(
  selectAppState,
  (state) => state.user,
);

// prettier-ignore
const selectIsAuthenticated = createSelector(
  selectAppState,
  (state) => !!state.user,
);

export const AppSelectors = {
  selectUser,
  selectIsAuthenticated,
};
