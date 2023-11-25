import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatisticsService } from '@core/services/statistics.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  maxPrice$ = new BehaviorSubject(0);
  minPrice$ = new BehaviorSubject(0);
  avgPrice$ = new BehaviorSubject(0);
  reservationsCount$ = new BehaviorSubject(0);
  reservationsPrices$ = new BehaviorSubject(0);

  roomReservationsCount$ = new BehaviorSubject<number[]>([]);
  roomReservationsCountLabels$ = new BehaviorSubject<string[]>([]);

  constructor(private readonly statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.callProcedureMaxReservationPrice().subscribe((maxPrice) => {
      console.log('XXX maxPrice', maxPrice);
      this.maxPrice$.next(maxPrice[0].max_price);
    });

    this.statisticsService.callProcedureMinReservationPrice().subscribe((minPrice) => {
      console.log('XXX minPrice', minPrice);
      this.minPrice$.next(minPrice[0].min_price);
    });

    this.statisticsService.callProcedureAvgReservationPrice().subscribe((avgPrice) => {
      console.log('XXX avgPrice', avgPrice);
      this.avgPrice$.next(avgPrice[0].avg_price);
    });

    this.statisticsService.callProcedureReservationsCount().subscribe((reservationsCount) => {
      console.log('XXX reservationsCount', reservationsCount);
      this.reservationsCount$.next(reservationsCount[0].reservations_count);
    });

    this.statisticsService.callProcedureReservationsPrice().subscribe((reservationsPrices) => {
      console.log('XXX reservationsPrices', reservationsPrices);
      this.reservationsPrices$.next(reservationsPrices[0].reservations_price);
    });

    this.statisticsService.callProcedureRoomReservationsCount().subscribe((roomReservationsCount) => {
      console.log('XXX roomReservationsCount', roomReservationsCount);

      this.roomReservationsCount$.next(
        roomReservationsCount.map((roomReservationCount: any) => roomReservationCount.reservations_count),
      );

      this.roomReservationsCountLabels$.next(
        roomReservationsCount.map(
          (roomReservationCount: any) =>
            `Номер ${roomReservationCount.room_type}, ${roomReservationCount.reservations_count} брони(ей)`,
        ),
      );
    });
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }
}
