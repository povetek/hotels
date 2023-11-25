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
  reservationsPrices$ = new BehaviorSubject([]);

  readonly value = [13769, 12367, 10172, 3018, 2592];

  readonly data = [
    {
      param: 'Alex Inkin',
      value: 1323525,
    },
    {
      param: 'Roman Sedov',
      value: 423242,
    },
  ] as const;
  readonly columns = ['param', 'value'];

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

      this.reservationsPrices$.next(
        reservationsPrices.map((reservationsPrice: any) => reservationsPrice.reservations_price),
      );
    });
  }
}
