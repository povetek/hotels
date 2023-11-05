import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '@store/app/app.interface';
import { SupabaseService } from '@core/services/supabase.service';
import { TuiDay } from '@taiga-ui/cdk';

@Injectable()
export class ProfileService {
  constructor(private supabaseService: SupabaseService) {}

  getProfile(id: string): Observable<Profile> {
    return this.supabaseService.select('profile', '', id).pipe(map(this.responseAdapter));
  }

  upsertProfile(data: Profile): Observable<Profile> {
    return this.supabaseService.upsert('profile', this.requestAdapter(data));
  }

  private responseAdapter(response: any): Profile {
    return {
      id: response.id,
      surname: response.surname,
      name: response.name,
      patronymic: response.patronymic,
      birthdate: response.birthdate ? TuiDay.normalizeParse(response.birthdate, 'YMD') : TuiDay.currentLocal(),
      email: response.email,
      phone: response.phone,
      meta: response.meta,
    };
  }

  private requestAdapter(profile: Profile): any {
    return {
      id: profile.id,
      surname: profile.surname,
      name: profile.name,
      patronymic: profile.patronymic,
      birthdate: profile.birthdate.toString('YMD'),
      email: profile.email,
      phone: profile.phone,
      meta: profile.meta,
    };
  }
}
