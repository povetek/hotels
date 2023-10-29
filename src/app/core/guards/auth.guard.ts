import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(Store)
    .select(AppSelectors.selectIsAuthenticated)
    .pipe(
      take(1),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          void router.navigateByUrl('/login');
        }
      }),
    );
};
