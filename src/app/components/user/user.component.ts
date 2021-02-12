import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserApiService} from '../../services/api/user-api.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {LocalStorageService} from '../../services/other/local-storage.service';
import {NavService} from '../../services/nav/nav.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  currentText = 'Loading ...';
  loading = true;

  redirectToPage = 'user/home';

  constructor(private router: Router,
              private userApi: UserApiService,
              private localStorageService: LocalStorageService,
  ) {
    this.redirectToPage = this.getLastRedirectPage();
  }

  ngOnInit(): void {
    if (!this.localStorageService.JWT_EXISTED()) {
      this.testAutoLogin();
      console.log('autooooooooo');
    } else {
      this.loading = false;
      this.router.navigateByUrl(this.redirectToPage);
    }

  }

  testAutoLogin() {
    this.loading = true;
    this.userApi.autologin().subscribe((response: JsonObject) => {
      this.loading = false;
      if (response.status === 200) {
        this.localStorageService.SAVE_JWT_KEY(response.token);
        this.localStorageService.SET_AUTO_LOGIN_STATUS();
        this.router.navigateByUrl(this.redirectToPage);
      } else {
        this.currentText = response.message.toString();
      }
    }, (error) => {
      this.loading = false;
      console.log(error);
      this.currentText = error.message;
    });
  }

  ngAfterViewInit(): void {

  }

  getLastRedirectPage() {
    console.log('you will navigate to ' + LocalStorageService.getLastRoute());
    return LocalStorageService.getLastRoute();
  }
}
