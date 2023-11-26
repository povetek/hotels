import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { permissionsGuardHOF } from '@core/guards/permissions.guard';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { EmployeePanelComponent } from './pages/employee-panel/employee-panel.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [] },
  { path: 'login', component: LoginComponent, canActivate: [] },
  { path: 'registration', component: RegistrationComponent, canActivate: [] },
  { path: 'rooms', component: RoomsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'reservation', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'employee-panel', component: EmployeePanelComponent, canActivate: [permissionsGuardHOF([2])] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [permissionsGuardHOF([2])] },
  { path: 'admin', component: AdminComponent, canActivate: [permissionsGuardHOF([3])] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
