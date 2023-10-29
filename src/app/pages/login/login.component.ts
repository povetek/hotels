import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SupabaseService } from '@core/services/supabase.service';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { withLoading } from '@core/utils/supabase';
import { AppActions } from '@store/app/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
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

  login(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const { email, password } = this.formGroup.getRawValue();

    this.supabaseService
      .signIn({ email, password })
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
    return new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(72),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]),
    });
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
