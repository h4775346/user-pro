import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserApiService} from '../../services/api/user-api.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {LocalStorageService} from '../../services/other/local-storage.service';
import {NavService} from '../../services/nav/nav.service';
import {CodeApiService} from '../../services/api/code-api.service';
import {CheckCodeService} from '../../services/other/check-code.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LocalService} from '../../services/api/local-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  currentText = 'Loading ...';
  loading = false;

  redirectToPage = '/user/home';

  constructor(private router: Router,
              private userApi: UserApiService,
              private localStorageService: LocalStorageService,
              private checkCodeService: CheckCodeService,
              public locale: LocalService
  ) {
  }

  ngOnInit(): void {
    if (this.localStorageService.GET_JWT_KEY() == null) {
      this.testAutoLogin();
      return;
    }
    this.checkCodeService.startCheckingNow();
    this.checkNavigation();

  }

  testAutoLogin() {
    this.loading = true;
    this.userApi.autologin().subscribe((response: any) => {
      this.loading = false;
      if (response.status === 200) {
        this.localStorageService.SAVE_JWT_KEY(response.token);
        this.checkCodeService.startCheckingNow();
        this.checkNavigation();
      }
    }, error => {
      this.loading = false;
      this.router.navigate(['user', 'login']);
    });
  }

  ngAfterViewInit(): void {

  }


  private checkNavigation() {
    if (this.localStorageService.IS_LOGGED_OUT()) {
      this.router.navigate(['user', 'login']);
      return;
    }
    if (this.router.url === '/user') {
      this.router.navigateByUrl(LocalStorageService.getLastRoute());
    }
  }
}
