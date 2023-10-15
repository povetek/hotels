import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Taiga-ui
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiButtonModule
} from '@taiga-ui/core';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Pages
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TuiCarouselModule, TuiIslandModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomepageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiLinkModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiCarouselModule,
    TuiIslandModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
