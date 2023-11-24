import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client, Employee, Profile, Review } from '@store/app/app.interface';
import { SupabaseService } from '@core/services/supabase.service';
import { TuiDay } from '@taiga-ui/cdk';

@Injectable()
export class ProfileService {
  constructor(private supabaseService: SupabaseService) {}

  getClient(id: string): Observable<Client> {
    return this.supabaseService.selectSingle('client', '*', id);
  }

  upsertClient(data: Client): Observable<Client> {
    return this.supabaseService.upsert('client', data as any).pipe(map((response) => response[0]));
  }

  getEmployee(id: string): Observable<Employee> {
    const query = `SELECT * FROM employee`;
    return this.supabaseService.selectSingle('employee', '*, job_title (*)', id, query);
  }

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

  getReviews(roomId: number): Observable<Review[]> {
    return this.supabaseService.selectWithFilters('review', '*, client (profile (*))', [
      { filter: 'eq', field: 'room_id', value: roomId },
    ]);
  }

  createReview(data: Review): Observable<Review> {
    return this.supabaseService.insert('review', data as any).pipe(map((response) => response[0]));
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
