import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/home/nav/nav.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { BillingComponent } from './components/home/billing/billing.component';
import { DataUsageComponent } from './components/home/data-usage/data-usage.component';
import { SessionsComponent } from './components/home/sessions/sessions.component';
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
    SessionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
