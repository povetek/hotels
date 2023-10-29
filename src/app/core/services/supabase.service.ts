import { Injectable } from '@angular/core';
import {
  AuthError,
  createClient,
  SupabaseClient,
  AuthResponse,
  AuthTokenResponse,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  UserResponse,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { from, Observable } from 'rxjs';
import { supabaseDataAdapter } from '@core/utils/supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  signUp(credentials: SignUpWithPasswordCredentials): Observable<AuthResponse['data']> {
    return from(this.supabaseClient.auth.signUp(credentials)).pipe(supabaseDataAdapter());
  }

  signIn(credentials: SignInWithPasswordCredentials): Observable<AuthTokenResponse['data']> {
    return from(this.supabaseClient.auth.signInWithPassword(credentials)).pipe(supabaseDataAdapter());
  }

  signOut(): Observable<void> {
    return from(this.supabaseClient.auth.signOut()).pipe(supabaseDataAdapter());
  }

  // public getProfile(): PromiseLike<any> {
  //   const user = this.getUser();
  //   return this.supabaseClient.from('profiles').select('username, website, avatar_url').eq('id', user?.id).single();
  // }
  //
  // public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): any {
  //   return this.supabaseClient.auth.onAuthStateChange(callback);
  // }
  //
  // public updateProfile(userUpdate: IUser): any {
  //   const user = this.getUser();
  //
  //   const update = {
  //     username: userUpdate.name,
  //     website: userUpdate.website,
  //     id: user?.id,
  //     updated_at: new Date(),
  //   };
  //
  //   return this.supabaseClient.from('profiles').upsert(update, {
  //     returning: 'minimal', // Do not return the value after inserting
  //   });
  // }
}
