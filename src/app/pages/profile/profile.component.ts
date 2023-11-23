import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TuiDay } from '@taiga-ui/cdk';
import { ProfileService } from '@core/services/profile.service';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';
import { BehaviorSubject, catchError, EMPTY, Observable, take } from 'rxjs';
import { countries, getTuiCountryIsoCode } from '@core/utils/tui';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';
import { withLoading } from '@core/utils/supabase';
import { AppActions } from '@store/app/app.actions';
import { PermissionsService } from '@core/services/permissions.service';

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
  isClient$!: Observable<boolean>;
  isEmployee$!: Observable<boolean>;

  constructor(
    private store: Store,
    private profileService: ProfileService,
    private permissionsService: PermissionsService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();
    this.isClient$ = this.permissionsService.isClient();
    this.isEmployee$ = this.permissionsService.isEmployee();

    this.isClient$.pipe(take(1)).subscribe((isClient) => {
      if (isClient) {
        this.formGroup.addControl('passportSeries', new FormControl('', [Validators.required]));
        this.formGroup.addControl('passportId', new FormControl('', [Validators.required]));
        this.formGroup.addControl('passportValidityPeriod', new FormControl('', [Validators.required]));
      }
    });

    this.isEmployee$.pipe(take(1)).subscribe((isEmployee) => {
      if (isEmployee) {

      }
    });

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
    });
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
