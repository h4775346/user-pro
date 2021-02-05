import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './components/home/nav/nav.component';
import {UserComponent} from './components/user/user.component';
import {LoginComponent} from './components/user/login/login.component';
import {SignupComponent} from './components/user/signup/signup.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import {BillingComponent} from './components/home/billing/billing.component';
import {DataUsageComponent} from './components/home/data-usage/data-usage.component';
import {SessionsComponent} from './components/home/sessions/sessions.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChargeCardComponent} from './components/home/external/charge-card/charge-card.component';
import {MatOptionModule} from '@angular/material/core';
import { DashboardWarningComponent } from './components/home/external/warnings/dashboard-warning/dashboard-warning.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    BillingComponent,
    DataUsageComponent,
    SessionsComponent,
    ChargeCardComponent,
    DashboardWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    MatOptionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
