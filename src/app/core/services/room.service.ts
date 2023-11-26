import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Filter, SupabaseService } from '@core/services/supabase.service';
import { Menu, Profile, Reservation, Restaurant, Room, Transfer } from '@store/app/app.interface';

@Injectable()
export class RoomService {
  constructor(private supabaseService: SupabaseService) {}

  getRooms(): Observable<Room[]> {
    return this.supabaseService.select('room', '*');
  }

  updateRoom(id: string, data: Partial<Room>) {
    return this.supabaseService.update('room', id, data as any).pipe(map((response) => response[0]));
  }

  upsertRoom(data: Partial<Room>) {
    return this.supabaseService.upsert('room', data as any);
  }

  deleteRoom(id: number): Observable<void> {
    return this.supabaseService.delete('room', id);
  }

  getReservationsEmployee(filters: Filter[]): Observable<Reservation[]> {
    return this.supabaseService.selectWithFiltersAndOrderBy(
      'reservation',
      '*, room (*), transfer (*), restaurant (*), menu (*), client (profile (*))',
      filters,
      { filed: 'id', ascending: false },
    );
  }

  getReservations(filters: Filter[]): Observable<Reservation[]> {
    return this.supabaseService.selectWithFiltersAndOrderBy(
      'reservation',
      '*, room (*), transfer (*), restaurant (*), menu (*)',
      filters,
      { filed: 'id', ascending: false },
    );
  }

  getRoomsWithFilters(filters: Filter[]): Observable<Room[]> {
    return this.supabaseService.selectWithFilters('room', '*', filters);
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.supabaseService.select('restaurant', '*');
  }

  getMenus(): Observable<Menu[]> {
    return this.supabaseService.select('menu', '*');
  }

  getTransfers(): Observable<Transfer[]> {
    return this.supabaseService.select('transfer', '*');
  }

  insertReservation(data: Reservation): Observable<Profile> {
    return this.supabaseService.insert('reservation', data as any).pipe(map((response) => response[0]));
  }
}
