import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';
import { map, take, tap } from 'rxjs';

export const permissionsGuardHOF = (availablePermissions: number[]): CanActivateFn => {
  return (route, state) => {
    const router = inject(Router);

    return inject(Store)
      .select(AppSelectors.selectPermissions)
      .pipe(
        take(1),
        map((permissions) =>
          availablePermissions.some((availablePermission) => permissions.includes(availablePermission)),
        ),
        tap((isAvailable) => {
          if (!isAvailable) {
            void router.navigateByUrl('/login');
          }
        }),
      );
  };
};
