import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TuiInputCardGroupedComponent } from '@taiga-ui/addon-commerce';
import { TuiDay } from '@taiga-ui/cdk';
import { ProfileService } from '@core/services/profile.service';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';
import { BehaviorSubject, catchError, concatMap, EMPTY } from 'rxjs';
import { countries, getTuiCountryIsoCode } from '@core/utils/tui';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';
import { withLoading } from '@core/utils/supabase';

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
  readonly items = [
    { card: '4321***1234', expire: '12/21', name: 'Salary', bank: 'Tinkoff' },
    {
      card: '8765***5678',
      expire: '03/42',
      cvc: '***',
      name: 'Tips',
      bank: 'Bank of America',
    },
    { card: '4200***9000', name: 'Dogecoins', bank: 'Crypto' },
  ];
  loading$ = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private profileService: ProfileService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.createFormGroup();

    this.store
      .select(AppSelectors.selectUser)
      .pipe(concatMap((user) => this.profileService.getProfile(user?.id ?? '').pipe(withLoading(this.loading$))))
      .subscribe((profile) => {
        console.log('XXX profile', profile);
        this.countryIsoCode = getTuiCountryIsoCode(profile.phone);
        this.formGroup.patchValue(profile);
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
      .subscribe(() => {
        this.showNotification('Успех', 'Данные обновлены', 'success');
      });
  }

  onClick(component: TuiInputCardGroupedComponent): void {
    this.formGroup.get('meta')?.setValue(null);
    this.onEsc(component);
  }

  onEsc(component: TuiInputCardGroupedComponent): void {
    component.nativeFocusableElement?.focus();
    component.open = false;
  }

  private createFormGroup() {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      patronymic: new FormControl('', [Validators.required]),
      birthdate: new FormControl(TuiDay.currentLocal(), [Validators.required]),
      // email: new FormControl('', [Validators.required]),
      // phone: new FormControl('', [Validators.required]),
      // meta: new FormControl(this.items[0]),
    });
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
