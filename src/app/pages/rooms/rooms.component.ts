import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoomService } from '@core/services/room.service';
import { BehaviorSubject, filter } from 'rxjs';
import { Room, Transfer } from '@store/app/app.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Filter } from '@core/services/supabase.service';
import { AppSelectors } from '@store/app/app.selectors';
import { TuiDay } from '@taiga-ui/cdk';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService],
})
export class RoomsComponent implements OnInit {
  formGroup!: FormGroup;
  transferGroup!: FormGroup;
  roomTypes = ['', 'Люкс', 'Двухместный', 'Трехместный'];
  bedCount = ['', 1, 2, 3, 4, 5];
  floorNumbers = ['', 1, 2, 3, 4, 5];
  areas = ['', 25, 30, 40, 45, 50];
  open = false;

  readonly min = 1;
  readonly max = 30;
  readonly totalSteps = 30;

  rooms$ = new BehaviorSubject<Room[] | null>(null);
  transfers$ = new BehaviorSubject<Transfer[] | null>(null);

  constructor(private store: Store, private readonly roomService: RoomService) {}

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    this.transferGroup = this.createTransferGroup();
    this.getRooms();

    this.roomService.getTransfers().subscribe((transfers) => {
      this.transfers$.next(transfers);
    });
  }

  getRooms(): void {
    const filters: Filter[] = [{
      filter: 'lte',
      field: 'available_date',
      value: TuiDay.currentLocal().toString('YMD'),
    }];

    this.roomService.getRoomsWithFilters(filters).subscribe((rooms) => {
      this.rooms$.next(rooms);
    });
  }

  filtersSubmit(): void {
    const formFilters = this.formGroup.getRawValue();
    const filters: Filter[] = [];

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

    filters.push({
      filter: 'lte',
      field: 'available_date',
      value: TuiDay.currentLocal().toString('YMD'),
    });

    this.roomService.getRoomsWithFilters(filters).subscribe((rooms) => {
      this.rooms$.next(rooms);
    });
  }

  showDialog(room: Room): void {
    this.transferGroup.get('room')?.setValue(room);
    this.open = true;
  }

  modalSubmit(observer: any): void {
    observer.complete();

    this.store
      .select(AppSelectors.selectProfile)
      .pipe(filter((profile) => !!profile))
      .subscribe((profile) => {
        const { room, transfer, days } = this.transferGroup.getRawValue();

        const reservationData = {
          client_id: profile?.id,
          room_id: room.id,
          arrival_date: TuiDay.currentLocal().toString('YMD'),
          departure_date: TuiDay.currentLocal().append({ day: days }).toString('YMD'),
          price: room.price_per_night * days + transfer.price,
          transfer_id: transfer.id,
        };
        this.roomService.insertReservation(reservationData).subscribe();

        const roomData = {
          available_date: TuiDay.currentLocal()
            .append({ day: days + 1 })
            .toString('YMD'),
        };
        this.roomService.updateRoom(room.id, roomData).subscribe();
        this.getRooms();
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

  private createTransferGroup() {
    return new FormGroup({
      room: new FormControl('', Validators.required),
      transfer: new FormControl('', Validators.required),
      days: new FormControl(1, Validators.required),
    });
  }
}
