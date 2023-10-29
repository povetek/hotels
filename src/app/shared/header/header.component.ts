import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SupabaseService } from '@core/services/supabase.service';
import { TUI_ARROW } from '@taiga-ui/kit';
import { AppSelectors } from '@store/app/app.selectors';
import { AppActions } from '@store/app/app.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
      label: `Components`,
      items: [
        {
          label: 'Input',
          routerLink: '/components/input',
        },
        {
          label: 'Select',
          routerLink: '/components/select',
        },
        {
          label: 'DataList',
          routerLink: '/components/data-list',
        },
      ],
    },
    {
      label: `Styles`,
      items: [
        {
          label: `Icons`,
          routerLink: '/icons',
        },
        {
          label: `Typography`,
          routerLink: '/typography',
        },
      ],
    },
  ];

  isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store, private router: Router, private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(AppSelectors.selectIsAuthenticated);
  }

  signOut(): void {
    this.store.dispatch(AppActions.SetUser({ payload: null }));
    this.supabaseService.signOut().subscribe();
    this.router.navigateByUrl('/login');
  }
}
