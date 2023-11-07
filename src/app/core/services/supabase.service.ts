import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  AuthResponse,
  AuthTokenResponse,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { from, Observable } from 'rxjs';
import { supabaseDataAdapter } from '@core/utils/supabase';

interface UpsertData {
  id: string;
}

export interface Filter {
  filter: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'ilike' | 'is' | 'in' | 'neq';
  field: string;
  value: any;
}

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

  select(table: string, fields: string): Observable<any> {
    return from(this.supabaseClient.from(table).select(fields)).pipe(supabaseDataAdapter());
  }

  selectWithFilters(table: string, fields: string, filters: Filter[]): Observable<any> {
    const request = filters.reduce((request, { filter, field, value }) => {
      switch (filter) {
        case 'eq':
          return request.eq(field, value);
        default:
          return request;
      }
    }, this.supabaseClient.from(table).select(fields));

    return from(request).pipe(supabaseDataAdapter());
  }

  selectSingle(table: string, fields: string, id: string): Observable<any> {
    return from(this.supabaseClient.from(table).select(fields).eq('id', id).single()).pipe(supabaseDataAdapter());
  }

  upsert(table: string, data: UpsertData): Observable<any> {
    return from(this.supabaseClient.from(table).upsert(data).select()).pipe(supabaseDataAdapter());
  }
}