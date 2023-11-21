import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Filter, SupabaseService } from '@core/services/supabase.service';
import { Profile, Reservation, Room, Transfer } from '@store/app/app.interface';

@Injectable()
export class RoomService {
  constructor(private supabaseService: SupabaseService) {}

  getRooms(): Observable<Room[]> {
    return this.supabaseService.select('room', '*');
  }

  getRoomsWithFilters(filters: Filter[]): Observable<Room[]> {
    return this.supabaseService.selectWithFilters('room', '*', filters);
  }

  getTransfers(): Observable<Transfer[]> {
    return this.supabaseService.select('transfer', '*');
  }

  updateRoom(id: string, data: Partial<Room>) {
    return this.supabaseService.update('room', id, data as any).pipe(map((response) => response[0]));
  }

  insertReservation(data: Reservation): Observable<Profile> {
    return this.supabaseService.insert('reservation', data as any).pipe(map((response) => response[0]));
  }
}
