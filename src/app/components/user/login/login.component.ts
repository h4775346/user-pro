import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../services/other/local-storage.service';
import {UserApiService} from '../../../services/api/user-api.service';
import {CodeApiService} from '../../../services/api/code-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UserLoginModel} from '../../../Models/user-login-model';
import {Route, Router} from '@angular/router';
import {CheckCodeService} from '../../../services/other/check-code.service';
import {UserDataModel} from '../../../Models/user-data-model';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {ConfigModule} from '../../../Config/config.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  codeData;
  code;
  disableCode = true;
  message;
  userLoginModel: UserLoginModel = new UserLoginModel();
  loading = false;
  jwt;
  onlineMode = false;

  constructor(public localStorageService: LocalStorageService,
              private userApi: UserApiService,
              private codeApi: CodeApiService,
              private router: Router,
              private checkCodeService: CheckCodeService,
  ) {
  }

  ngOnInit(): void {

    this.codeData = this.localStorageService.GET_CODE_DATA();


    if (this.localStorageService.GET_CODE()) {
      this.code = this.localStorageService.GET_CODE();
    }
    console.log(this.localStorageService.GET_CODE());
    if (this.code && this.codeData.profile_status !== 'active') {
      this.message = 'Code Number ( ' + this.code + ' ) is Expired, Please Renew It';
    }


    const mainUser = this.localStorageService.GET_MAIN_USER();
    if (mainUser != null) {
      this.userLoginModel.username = mainUser.username;
      if (mainUser.password !== true) {
        this.userLoginModel.password = mainUser.password;
      }
    }


    this.checkAutoLogin();


    this.checkManualLogin();

    this.checkLoginMode();


  }

  private checkAutoLogin() {

    this.userApi.autologin().subscribe((response: JsonObject) => {
      this.loading = false;
      if (response.status === 200) {
        this.jwt = response.token;
      }
    });
  }

  private checkManualLogin() {
    if (this.code && this.userLoginModel.username && this.userLoginModel.password && !this.localStorageService.IS_LOGGED_OUT()) {
      console.log('manual login');
      this.login();
    }
  }


  login() {
    this.message = null;
    this.getProCodeData(this.code);
  }

  getProCodeData(code) {
    this.loading = true;
    this.codeApi.getCodeData(code).subscribe((codeData: any) => {
      this.localStorageService.SAVE_CODE_DATA(codeData);
      this.checkCodeExpiration();
    }, (error: HttpErrorResponse) => {
      this.loading = false;

      if (error.status === 0) {
        this.message = 'Can not get code data from online page';
      } else if (error.status === 500) {
        this.message = 'Wrong Code Number';
      } else {
        this.message = error.message;
      }
      console.log(error);
    });
  }

  checkCodeExpiration() {
    console.log('Code Check Done');
    if (LocalStorageService.CODE_DATA.profile_status !== 'active') {
      this.loading = false;
      this.message = `Code Number ( ${this.code} ) is Expired, Please Renew It`;
      return;
    }

    this.sasLogin();

  }

  private sasLogin() {
    this.checkLoginMode();
    this.userApi.login(this.userLoginModel).subscribe((response: any) => {
      this.loading = false;
      if (response.status === -1) {
        this.message = 'Wrong Username Or Password';
        return;
      } else if (response.status !== 200) {
        this.message = response.message;
      } else {
        this.localStorageService.SAVE_JWT_KEY(response.token);
        this.localStorageService.SET_AUTO_LOGIN_STATUS(false);
        this.localStorageService.SAVE_LOGIN_DATA(this.userLoginModel);
        this.localStorageService.SET_LOGOUT_STATUS(false);
        this.checkCodeService.startCheckingNow();
        this.router.navigate(['user', 'home']);

      }


    }, (error: HttpErrorResponse) => {
      this.loading = false;


      if (error.status === 0) {
        this.message = 'Can not connect to sas server';
      } else if (error.status === 401) {
        this.message = 'Wrong Username Or Password';
      } else {
        this.message = error.message;
      }

    });

  }

  autoLogin() {
    this.localStorageService.SET_LOGOUT_STATUS(false);
    this.localStorageService.SAVE_JWT_KEY(this.jwt);
    this.localStorageService.SET_AUTO_LOGIN_STATUS(true);
    this.localStorageService.SET_BASE_URL(UserApiService.AutoBaseIp);
    this.localStorageService.GET_REMOVE_CODE_DATA();
    this.checkCodeService.startCheckingNow();
    this.router.navigate(['user', 'home']);

  }


  baseUrlSwitch(online) {
    this.localStorageService.SET_ONLINE_LOGIN(online);
    if (online) {
      this.localStorageService.SET_BASE_URL(this.localStorageService.GET_CODE_DATA().ip_out);
    } else {
      this.localStorageService.SET_BASE_URL(this.localStorageService.GET_CODE_DATA().ip_in);
    }
  }

  private checkLoginMode() {
    this.onlineMode = this.localStorageService.IS_ONLINE_LOGIN();
    if (this.onlineMode) {
      this.localStorageService.SET_BASE_URL(this.localStorageService.GET_CODE_DATA().ip_out);
    } else {
      this.localStorageService.SET_BASE_URL(this.localStorageService.GET_CODE_DATA().ip_in);
    }
  }
}
