import { User } from '@supabase/supabase-js';
import { TuiDay } from '@taiga-ui/cdk';

export const APP_FEATURE_KEY = 'app';

export interface IAppState {
  user: User | null;
}

export interface Profile {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  birthdate: TuiDay;
  email: string;
  phone: string;
  meta: any;
}
