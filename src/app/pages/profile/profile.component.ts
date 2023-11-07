import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TuiDay } from '@taiga-ui/cdk';
import { ProfileService } from '@core/services/profile.service';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { countries, getTuiCountryIsoCode } from '@core/utils/tui';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';
import { withLoading } from '@core/utils/supabase';
import { AppActions } from '@store/app/app.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {
  formGroup!: FormGroup;
  countryIsoCode = TuiCountryIsoCode.BY;
  readonly countries = countries;
  loading$ = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private profileService: ProfileService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();

    this.store.select(AppSelectors.selectProfile).subscribe((profile) => {
      if (profile) {
        this.countryIsoCode = getTuiCountryIsoCode(profile.phone);
        this.formGroup.patchValue({
          ...profile,
          birthdate: TuiDay.normalizeParse(profile.birthdate.toString('YMD'), 'YMD'),
        });
      }
    });
  }

  upsertProfile(): void {
    this.profileService
      .upsertProfile(this.formGroup.getRawValue())
      .pipe(
        withLoading(this.loading$),
        catchError((error) => {
          this.showNotification('Upsert Error', error, 'error');
          return EMPTY;
        }),
      )
      .subscribe((profile) => {
        this.store.dispatch(AppActions.PatchProfile({ payload: profile }));
        this.showNotification('Успех', 'Данные обновлены', 'success');
      });
  }

  private createFormGroup() {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      patronymic: new FormControl('', [Validators.required]),
      birthdate: new FormControl(TuiDay.currentLocal(), [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.required]),
      // meta: new FormControl(this.items[0]),
    });
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
