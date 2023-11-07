import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, IAppState } from './app.interface';

const selectAppState = createFeatureSelector<IAppState>(APP_FEATURE_KEY);

// prettier-ignore
const selectProfile = createSelector(
  selectAppState,
  (state) => state.profile,
);

// prettier-ignore
const selectIsAuthenticated = createSelector(
  selectAppState,
  (state) => !!state.profile,
);

// prettier-ignore
const selectPermissions = createSelector(
  selectAppState,
  (state) => state.profile?.permissions ?? [],
);

// prettier-ignore
const selectHomepage = createSelector(
  selectAppState,
  (state) => state.homepage,
);

export const AppSelectors = {
  selectProfile,
  selectIsAuthenticated,
  selectPermissions,
  selectHomepage,
};
