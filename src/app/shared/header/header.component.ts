import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SupabaseService } from '@core/services/supabase.service';
import { TUI_ARROW } from '@taiga-ui/kit';
import { AppSelectors } from '@store/app/app.selectors';
import { AppActions } from '@store/app/app.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Homepage } from '@store/app/app.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  readonly arrow = TUI_ARROW;
  readonly groups = [
    {
      label: ``,
      items: [
        {
          label: `Профиль`,
          routerLink: '/profile',
        },
      ],
    },
  ];

  isAuthenticated$!: Observable<boolean>;
  homepage$!: Observable<Homepage | null>;

  constructor(private store: Store, private router: Router, private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(AppSelectors.selectIsAuthenticated);
    this.homepage$ = this.store.select(AppSelectors.selectHomepage);
  }

  signOut(): void {
    this.store.dispatch(AppActions.SetProfile({ payload: null }));
    this.supabaseService.signOut().subscribe();
    void this.router.navigateByUrl('/');
  }
}
