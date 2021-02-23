import {Component, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav/nav.service';
import {DashboardWarningService} from '../../../services/other/dashboard-warning.service';
import {LocalStorageService} from '../../../services/other/local-storage.service';
import {Router} from '@angular/router';
import {UserApiService} from '../../../services/api/user-api.service';
import {LocalService} from '../../../services/api/local-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  sideToggled = false;

  constructor(private navService: NavService,
              public warnings: DashboardWarningService,
              public localStorageService: LocalStorageService,
              private router: Router,
              public userApi: UserApiService,
              public locale: LocalService) {
  }

  ngOnInit(): void {
  }

  sideToggle(): void {
    this.sideToggled = !this.sideToggled;
  }

  sideToggleForceClose(): void {
    this.sideToggled = false;
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  logout() {
    this.localStorageService.SET_LOGOUT_STATUS(true);
    this.router.navigate(['user', 'login']);
  }
}
