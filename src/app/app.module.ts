import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { of } from 'rxjs';

// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
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
} from '@taiga-ui/core';
import {
  TuiCarouselModule,
  TuiCheckboxBlockModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiIslandModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { TuiInputCardGroupedModule, TuiThumbnailCardModule } from '@taiga-ui/addon-commerce';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';

// Pages
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Shared
import { HeaderComponent } from '@shared/header/header.component';
import { FooterComponent } from '@shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegistrationComponent,
    RoomsComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
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
