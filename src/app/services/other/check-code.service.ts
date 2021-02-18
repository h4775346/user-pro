import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {CodeApiService} from '../api/code-api.service';
import {UserApiService} from '../api/user-api.service';
import {Router} from '@angular/router';
import {ConfigModule} from '../../Config/config.module';

@Injectable({
  providedIn: 'root'
})
export class CheckCodeService {


  errorCounter = 0;

  constructor(private codeApi: CodeApiService,
              private userApi: UserApiService,
              private localStorageService: LocalStorageService,
              private router: Router
  ) {

  }


  startChecking() {
    setTimeout(() => {
      if (!ConfigModule.CheckCode) {
        return;
      }
      if (!this.localStorageService.GET_CODE()) {
        this.checkCode();
      } else {
        this.getProCodeData();
      }
    }, 30 * 1000);
  }

  startCheckingNow() {
    if (!this.localStorageService.GET_CODE()) {
      this.checkCode(false);
    } else {
      this.getProCodeData(false);
    }
  }

  checkCode(fromTimer = true) {
    this.userApi.getAdminAutoCode().subscribe((response: any) => {
      this.localStorageService.SET_CODE((response.data.lid - 512));
      this.getProCodeData(fromTimer);
      this.errorCounter = 0;
    }, error => {
      this.startChecking();
      if (this.errorCounter++ >= 3) {
        this.router.navigate(['user', 'login']);
      }

    });

  }

  getProCodeData(fromTimer = true) {
    this.codeApi.getCodeData().subscribe((codeData: any) => {
      this.localStorageService.SAVE_CODE_DATA(codeData);
      this.checkCodeExpiration(fromTimer);
      this.errorCounter = 0;
    }, error => {
      this.startChecking();
      if (this.errorCounter++ >= 3) {
        this.router.navigate(['user', 'login']);
      }
    });
  }

  checkCodeExpiration(fromTimer = true) {
    console.log('Code Check Done');
    if (LocalStorageService.CODE_DATA.profile_status !== 'active') {
      console.log('Expired');
      this.router.navigate(['user', 'login']);
      return;
    }
    if (fromTimer) {
      this.startChecking();
    }
  }

}

