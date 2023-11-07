import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homepage } from '@store/app/app.interface';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private supabaseService: SupabaseService) {}

  getHomepage(id: string): Observable<Homepage> {
    return this.supabaseService.selectSingle('hotel', '', id);
  }
}
