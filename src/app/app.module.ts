import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { of } from 'rxjs';

// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// NgRx modules
import { StoreModule } from '@ngrx/store';
import { reducers } from '@store/reducers';
import { metaReducers } from '@store/meta-reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '@store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Taiga-ui
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiHostedDropdownModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiGroupModule,
  TuiTooltipModule, TuiFormatNumberPipeModule,
} from '@taiga-ui/core';
import {
  TuiCarouselModule,
  TuiCheckboxBlockModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiInputSliderModule,
  TuiIslandModule,
  TuiRadioBlockModule,
  TuiRatingModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiInputCardGroupedModule, TuiMoneyModule, TuiThumbnailCardModule } from '@taiga-ui/addon-commerce';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';

// Pages
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { EmployeePanelComponent } from './pages/employee-panel/employee-panel.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

// Shared
import { HeaderComponent } from '@shared/header/header.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { ReviewComponent } from '@shared/review/review.component';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiRingChartModule } from '@taiga-ui/addon-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegistrationComponent,
    RoomsComponent,
    ProfileComponent,
    ReservationComponent,
    EmployeePanelComponent,
    StatisticsComponent,
    HeaderComponent,
    FooterComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      name: 'Povetek Hotels',
    }),

    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiLinkModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiInputPhoneModule,
    TuiInputPhoneInternationalModule,
    TuiThumbnailCardModule,
    TuiLabelModule,
    TuiInputCardGroupedModule,
    TuiInputDateModule,
    TuiFieldErrorPipeModule,
    TuiInputNumberModule,
    TuiGroupModule,
    TuiCheckboxBlockModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiRadioBlockModule,
    TuiInputSliderModule,
    TuiTooltipModule,
    TuiInputDateRangeModule,
    TuiMoneyModule,
    TuiAutoFocusModule,
    FormsModule,
    TuiRatingModule,
    TuiTableModule,
    TuiFormatNumberPipeModule,
    TuiRingChartModule,
  ],
  providers: [
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
