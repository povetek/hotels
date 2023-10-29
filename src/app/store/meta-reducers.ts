import { ActionReducer, MetaReducer } from '@ngrx/store';
import { IState } from '@store/reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { APP_FEATURE_KEY } from '@store/app/app.interface';

export function localStorageSyncReducer(reducer: ActionReducer<IState>): ActionReducer<IState> {
  return localStorageSync({
    keys: [APP_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<IState>[] = [localStorageSyncReducer];
