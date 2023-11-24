import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomService } from '@core/services/room.service';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '@store/app/app.interface';
import { Store } from '@ngrx/store';
import * as XLSX from 'xlsx';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ReviewComponent } from '@shared/review/review.component';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrl: './employee-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService],
})
export class EmployeePanelComponent implements OnInit {
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
    this.roomService.getReservationsEmployee([]).subscribe((reservations) => {
      this.reservations$.next(reservations);
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
      clientSurname: reservation.client?.profile?.surname,
      clientName: reservation.client?.profile?.name,
      clientPatronymic: reservation.client?.profile?.patronymic,
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
}
