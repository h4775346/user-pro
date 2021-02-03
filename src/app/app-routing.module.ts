import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import {BillingComponent} from './components/home/billing/billing.component';
import {DataUsageComponent} from './components/home/data-usage/data-usage.component';
import {SessionsComponent} from './components/home/sessions/sessions.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {
        path: 'home', component: HomeComponent, children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: '', component: DashboardComponent},
          {path: 'billing', component: BillingComponent},
          {path: 'data-usage', component: DataUsageComponent},
          {path: 'sessions', component: SessionsComponent},
        ]
      },
    ]
  },
  {path: '', redirectTo: '/user/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AppRoutingModule {
}
