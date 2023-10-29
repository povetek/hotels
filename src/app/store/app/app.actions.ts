import { createAction, props } from '@ngrx/store';
import { User } from '@supabase/supabase-js';

const suffix = '[App]';

export const AppActions = {
  SetUser: createAction(`${suffix} SetUser`, props<{ payload: User | null }>()),
};
