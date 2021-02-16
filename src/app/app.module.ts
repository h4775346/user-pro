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
import {DashboardWarningComponent} from './components/home/external/warnings/dashboard-warning/dashboard-warning.component';
import {ActivateServiceComponent} from './components/home/external/activate-service/activate-service.component';
import {ConfirmDialogComponent} from './components/home/external/dialogs/confirm-dialog/confirm-dialog.component';
import {ExtendServiceComponent} from './components/home/external/extend-service/extend-service.component';
import {InputDialogComponent} from './components/home/external/dialogs/input-dialog/input-dialog.component';
import {ChangeServiceComponent} from './components/home/external/change-service/change-service.component';
import {MessageDialogComponent} from './components/home/external/dialogs/message-dialog/message-dialog.component';
import {InvoicesComponent} from './components/home/billing/invoices/invoices.component';
import {PaymentsComponent} from './components/home/billing/payments/payments.component';
import {BalanceJournalComponent} from './components/home/billing/balance-journal/balance-journal.component';
import {SpinnerComponent} from './components/home/external/spinner/spinner.component';
import {MDBBootstrapModule, InputsModule} from 'angular-bootstrap-md';
import {SelectModule} from 'ng-uikit-pro-standard';


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
    DashboardWarningComponent,
    ActivateServiceComponent,
    ConfirmDialogComponent,
    ExtendServiceComponent,
    InputDialogComponent,
    ChangeServiceComponent,
    MessageDialogComponent,
    InvoicesComponent,
    PaymentsComponent,
    BalanceJournalComponent,
    SpinnerComponent
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
    MDBBootstrapModule.forRoot(),
    InputsModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

//              "node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss",
// //              "node_modules/@fortawesome/fontawesome-free/scss/solid.scss",
// //              "node_modules/@fortawesome/fontawesome-free/scss/regular.scss",
// //              "node_modules/@fortawesome/fontawesome-free/scss/brands.scss",
