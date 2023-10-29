import { User } from '@supabase/supabase-js';

export const APP_FEATURE_KEY = 'app';

export interface IAppState {
  user: User | null;
}
