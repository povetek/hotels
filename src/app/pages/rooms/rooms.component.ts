import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoomService } from '@core/services/room.service';
import { BehaviorSubject } from 'rxjs';
import { Room } from '@store/app/app.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter } from '@core/services/supabase.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService],
})
export class RoomsComponent implements OnInit {
  formGroup!: FormGroup;
  roomTypes = ['', 'Люкс', 'Двухместный', 'Трехместный'];
  bedCount = ['', 1, 2, 3, 4, 5];
  floorNumbers = ['', 1, 2, 3, 4, 5];
  areas = ['', 25, 30, 40, 45, 50];
  rooms$ = new BehaviorSubject<Room[] | null>(null);

  constructor(private readonly roomService: RoomService) {}

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();

    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms$.next(rooms);
    });
  }

  filtersSubmit(): void {
    const formFilters = this.formGroup.getRawValue();
    let filters: Filter[] = [];

    if (formFilters.roomType) {
      filters.push({
        filter: 'eq',
        field: 'room_type',
        value: formFilters.roomType,
      });
    }

    if (formFilters.bedCount) {
      filters.push({
        filter: 'eq',
        field: 'bed_count',
        value: formFilters.bedCount,
      });
    }

    if (formFilters.floorNumber) {
      filters.push({
        filter: 'eq',
        field: 'floor_number',
        value: formFilters.floorNumber,
      });
    }

    if (formFilters.area) {
      filters.push({
        filter: 'eq',
        field: 'area',
        value: formFilters.area,
      });
    }

    this.roomService.getRoomsWithFilters(filters).subscribe((rooms) => {
      this.rooms$.next(rooms);
    });
  }

  private createFormGroup() {
    return new FormGroup({
      roomType: new FormControl(),
      bedCount: new FormControl(),
      floorNumber: new FormControl(),
      area: new FormControl(),
    });
  }
}
