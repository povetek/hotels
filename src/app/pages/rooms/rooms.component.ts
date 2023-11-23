import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { RoomService } from '@core/services/room.service';
import { BehaviorSubject, filter, take } from 'rxjs';
import { Menu, Reservation, Restaurant, Room, Transfer } from '@store/app/app.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Filter } from '@core/services/supabase.service';
import { AppSelectors } from '@store/app/app.selectors';
import { TuiDay } from '@taiga-ui/cdk';
import { Store } from '@ngrx/store';
import { TuiAlertService, TuiDialogService, TuiNotificationT } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ReviewComponent } from '@shared/review/review.component';

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

  rooms$ = new BehaviorSubject<Room[]>([]);
  restaurants$ = new BehaviorSubject<Restaurant[]>([]);
  menus$ = new BehaviorSubject<Menu[]>([]);
  transfers$ = new BehaviorSubject<Transfer[]>([]);

  private readonly dialog = this.dialogs.open<number>(new PolymorpheusComponent(ReviewComponent, this.injector), {
    data: 237,
    dismissible: true,
    label: 'Heading',
  });

  constructor(
    private store: Store,
    private readonly roomService: RoomService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    this.transferGroup = this.createTransferGroup();
    this.getRooms();

    this.roomService.getRestaurants().subscribe((restaurants) => {
      this.restaurants$.next(restaurants);
    });

    this.roomService.getMenus().subscribe((menus) => {
      this.menus$.next(menus);
    });

    this.roomService.getTransfers().subscribe((transfers) => {
      this.transfers$.next(transfers);
    });
  }

  getRooms(): void {
    const filters: Filter[] = [
      {
        filter: 'lte',
        field: 'available_date',
        value: TuiDay.currentLocal().toString('YMD'),
      },
    ];

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
      .pipe(
        take(1),
        filter((profile) => {
          if (profile && profile.surname) {
            return true;
          }

          this.showNotification('Отказ', 'Заполните профиль пользователя', 'error');
          return false;
        }),
      )
      .subscribe((profile) => {
        const { room, transfer, days, restaurant, menu } = this.transferGroup.getRawValue();

        const reservationData: Reservation = {
          client_id: profile?.id,
          room_id: room.id,
          arrival_date: TuiDay.currentLocal().toString('YMD'),
          departure_date: TuiDay.currentLocal().append({ day: days }).toString('YMD'),
          price: room.price_per_night * days + transfer.price,
          transfer_id: transfer.id,
          restaurant_id: restaurant.id,
          menu_id: menu.id,
        };

        this.roomService.insertReservation(reservationData).subscribe(() => {
          const roomData = {
            available_date: TuiDay.currentLocal()
              .append({ day: days + 1 })
              .toString('YMD'),
          };

          this.roomService.updateRoom(room.id, roomData).subscribe(() => {
            this.getRooms();
          });
        });
      });
  }

  showReviews(room: Room): void {
    this.dialog.subscribe({
      next: (data) => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
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
      days: new FormControl(1, Validators.required),
      restaurant: new FormControl('', Validators.required),
      menu: new FormControl('', Validators.required),
      transfer: new FormControl('', Validators.required),
    });
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
