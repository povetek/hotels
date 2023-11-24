import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProfileService } from '@core/services/profile.service';
import { BehaviorSubject, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Review } from '@store/app/app.interface';
import { TuiDay } from '@taiga-ui/cdk';
import { AppSelectors } from '@store/app/app.selectors';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
})
export class ReviewComponent implements OnInit {
  reviewControl = new FormControl(null, Validators.required);
  ratingControl = new FormControl(null, Validators.required);
  reviews$ = new BehaviorSubject<Review[]>([]);

  constructor(
    private readonly store: Store,
    private readonly profileService: ProfileService,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>,
  ) {}

  ngOnInit() {
    this.getReviews();
  }

  getReviews(): void {
    this.profileService.getReviews(this.context.data).subscribe((reviews) => {
      this.reviews$.next(reviews);
    });
  }

  createReview(): void {
    this.store
      .select(AppSelectors.selectProfile)
      .pipe(take(1))
      .subscribe((profile) => {
        if (profile) {
          const review = {
            client_id: profile.id,
            room_id: this.context.data,
            rating: this.ratingControl.value,
            comment: this.reviewControl.value,
            date: TuiDay.currentLocal().toString('YMD'),
          };

          this.profileService.createReview(review as any).subscribe(() => {
            this.getReviews();
          });
        }
      });
  }
}
