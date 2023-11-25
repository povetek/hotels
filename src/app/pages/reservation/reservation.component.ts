import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { RoomService } from '@core/services/room.service';
import { BehaviorSubject, filter, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Filter, SupabaseService } from '@core/services/supabase.service';
import { AppSelectors } from '@store/app/app.selectors';
import * as XLSX from 'xlsx';
import { Reservation, Room } from '@store/app/app.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ReviewComponent } from '@shared/review/review.component';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService],
})
export class ReservationComponent implements OnInit {
  fakeGroup = new FormGroup({
    test: new FormControl({ value: '', disabled: true }),
  });
  reservations$ = new BehaviorSubject<Reservation[]>([]);

  constructor(
    private store: Store,
    private readonly roomService: RoomService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.store
      .select(AppSelectors.selectProfile)
      .pipe(
        take(1),
        filter((profile) => !!profile),
      )
      .subscribe((profile) => {
        const filters: Filter[] = [
          // {
          //   filter: 'gte',
          //   field: 'available_date',
          //   value: TuiDay.currentLocal().toString('YMD'),
          // },
          // {
          //   filter: 'gte',
          //   field: 'available_date',
          //   value: TuiDay.currentLocal().toString('YMD'),
          // },
          {
            filter: 'eq',
            field: 'client_id',
            value: profile?.id,
          },
        ];

        this.roomService.getReservations(filters).subscribe((reservations) => {
          this.reservations$.next(reservations);
        });
      });
  }

  print(card: Element): void {
    card.setAttribute('style', 'display: block');
    window.print();
    setTimeout(() => {
      card.removeAttribute('style');
    });
  }

  exportExcel(reservation: Reservation): void {
    const result = {
      id: reservation.id,
      client_id: reservation.client_id,
      price: reservation.price,
      departure_date: reservation.departure_date,
      arrival_date: reservation.arrival_date,
      created_at: reservation.created_at,
      menuName: reservation.menu?.name,
      menuDescription: reservation.menu?.description,
      menuPrice: reservation.menu?.price,
      restaurantName: reservation.restaurant?.name,
      restaurantAddress: reservation.restaurant?.address,
      restaurantContacts: reservation.restaurant?.contacts,
      restaurantPrice: reservation.restaurant?.price,
      transferName: reservation.transfer?.name,
      transferArrivalPlace: reservation.transfer?.arrival_place,
      transferDeparturePlace: reservation.transfer?.departure_place,
      transferPrice: reservation.transfer?.price,
    };

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([result]);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'output.xlsx');
  }

  showReviews(reservation: Reservation): void {
    this.dialogs
      .open<number>(new PolymorpheusComponent(ReviewComponent, this.injector), {
        data: reservation?.room?.id,
        dismissible: true,
        label: 'Отзывы',
      })
      .subscribe();
  }

  isDateMoreThanNow(date: string): boolean {
    const passedDate = date ? TuiDay.normalizeParse(date, 'YMD') : TuiDay.currentLocal();
    return passedDate.dayBefore(TuiDay.currentLocal());
  }
}
