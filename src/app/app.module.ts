import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Taiga-ui
import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, TuiRootModule, TuiDialogModule, TuiAlertModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
