import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SupabaseService } from '@core/services/supabase.service';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';
import { withLoading } from '@core/utils/supabase';
import { AppActions } from '@store/app/app.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  formGroup!: FormGroup;
  loading$ = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private router: Router,
    private supabaseService: SupabaseService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  register(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const { email, password } = this.formGroup.getRawValue();

    this.supabaseService
      .signUp({ email, password })
      .pipe(
        withLoading(this.loading$),
        catchError((error) => {
          this.showNotification('Auth Error', error, 'error');
          return EMPTY;
        }),
      )
      .subscribe((data) => {
        this.store.dispatch(AppActions.SetUser({ payload: data.user }));
        void this.router.navigateByUrl('/main');
      });
  }

  private createForm() {
    return new FormGroup(
      {
        email: new FormControl('', [
          Validators.email,
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(72),
        ]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]),
        passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]),
      },
      { validators: this.passwordsMatch },
    );
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }

  private passwordsMatch(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const passwordRepeat = formGroup.get('passwordRepeat')?.value;
    return password === passwordRepeat ? null : { mismatch: true };
  }
}
