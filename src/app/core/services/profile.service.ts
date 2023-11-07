import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '@store/app/app.interface';
import { SupabaseService } from '@core/services/supabase.service';
import { TuiDay } from '@taiga-ui/cdk';

@Injectable()
export class ProfileService {
  constructor(private supabaseService: SupabaseService) {}

  getProfileWithPermissions(id: string): Observable<Profile> {
    return this.supabaseService
      .selectSingle('profile', '*, profile_permission (permission (code))', id)
      .pipe(map(this.responseAdapter));
  }

  upsertProfile(data: Profile): Observable<Profile> {
    return this.supabaseService.upsert('profile', this.requestAdapter(data)).pipe(
      map((response) => response[0]),
      map(this.responseAdapter),
    );
  }

  private responseAdapter(response: any): Profile {
    const result: Profile = {
      id: response.id,
      surname: response.surname,
      name: response.name,
      patronymic: response.patronymic,
      birthdate: response.birthdate ? TuiDay.normalizeParse(response.birthdate, 'YMD') : TuiDay.currentLocal(),
      phone: response.phone_number,
    };

    if (response.profile_permission) {
      result.permissions = response.profile_permission.map((permission: any) => permission.permission.code);
    }

    return result;
  }

  private requestAdapter(profile: Profile): any {
    return {
      id: profile.id,
      surname: profile.surname,
      name: profile.name,
      patronymic: profile.patronymic,
      birthdate: profile.birthdate.toString('YMD'),
      phone_number: profile.phone,
    };
  }
}
