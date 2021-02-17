import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserApiService} from '../../services/api/user-api.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {LocalStorageService} from '../../services/other/local-storage.service';
import {NavService} from '../../services/nav/nav.service';
import {CodeApiService} from '../../services/api/code-api.service';
import {CheckCodeService} from '../../services/other/check-code.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  currentText = 'Loading ...';
  loading = true;

  redirectToPage = '/user/home';

  constructor(private router: Router,
              private userApi: UserApiService,
              private localStorageService: LocalStorageService,
              private checkCodeService: CheckCodeService
  ) {
    this.redirectToPage = this.getLastRedirectPage();
  }

  ngOnInit(): void {
    if (this.localStorageService.IS_LOGGED_OUT()) {
      this.loading = true;
      this.redirectToPage = '/user/login';
      this.router.navigateByUrl(this.redirectToPage);
      return;
    }
    if (!this.localStorageService.JWT_EXISTED()) {
      this.testAutoLogin();
    } else {
      this.loading = false;
      if (NavService.CURRENT_ROUTE === '/user' || NavService.CURRENT_ROUTE === '') {
        this.router.navigateByUrl(this.redirectToPage);
      }
      this.checkCodeService.startCheckingNow();
    }
  }

  testAutoLogin() {
    this.loading = true;
    this.userApi.autologin().subscribe((response: JsonObject) => {
      this.loading = false;
      if (response.status === 200) {
        this.localStorageService.SAVE_JWT_KEY(response.token);
        this.localStorageService.SET_AUTO_LOGIN_STATUS(true);
        this.router.navigateByUrl(this.redirectToPage);
        this.checkCodeService.startCheckingNow();
      } else {
        this.currentText = response.message.toString();
      }
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      LocalStorageService.SET_AUTO_LOGIN_STATUS(false);
      this.router.navigate(['user', 'login']);
    });
  }

  ngAfterViewInit(): void {

  }

  getLastRedirectPage() {
    console.log('you will navigate to ' + LocalStorageService.getLastRoute());
    return LocalStorageService.getLastRoute();
  }


}
