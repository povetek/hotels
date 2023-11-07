import { createAction, props } from '@ngrx/store';
import { Homepage, Profile } from '@store/app/app.interface';

const suffix = '[App]';

export const AppActions = {
  Initialize: createAction(`${suffix} Initialize`),
  SetProfile: createAction(`${suffix} SetProfile`, props<{ payload: Profile | null }>()),
  PatchProfile: createAction(`${suffix} PatchProfile`, props<{ payload: Profile }>()),
  SetHomepage: createAction(`${suffix} SetHomepage`, props<{ payload: Homepage | null }>()),
};
