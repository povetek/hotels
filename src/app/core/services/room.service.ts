import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, SupabaseService } from '@core/services/supabase.service';
import { Room } from '@store/app/app.interface';

@Injectable()
export class RoomService {
  constructor(private supabaseService: SupabaseService) {}

  getRooms(): Observable<Room[]> {
    return this.supabaseService.select('room', '*');
  }

  getRoomsWithFilters(filters: Filter[]): Observable<Room[]> {
    return this.supabaseService.selectWithFilters('room', '*', filters);
  }
}
