import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private clientPermissions = [1];
  private employeePermissions = [2];
  private adminPermissions = [3];

  constructor(private store: Store) {}

  isClient(): Observable<boolean> {
    return this.store
      .select(AppSelectors.selectPermissions)
      .pipe(
        map((userPermissions) =>
          this.clientPermissions.every((clientPermission) => userPermissions.includes(clientPermission)),
        ),
      );
  }

  isEmployee(): Observable<boolean> {
    return this.store
      .select(AppSelectors.selectPermissions)
      .pipe(
        map((userPermissions) =>
          this.employeePermissions.every((employeePermission) => userPermissions.includes(employeePermission)),
        ),
      );
  }

  isAdmin(): Observable<boolean> {
    return this.store
      .select(AppSelectors.selectPermissions)
      .pipe(
        map((userPermissions) =>
          this.adminPermissions.every((adminPermission) => userPermissions.includes(adminPermission)),
        ),
      );
  }
}
