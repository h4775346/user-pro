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
      this.checkCode();
    } else {
      this.getProCodeData();
    }
  }

  checkCode(fromTimer = true) {
    this.userApi.getAdminAutoCode().subscribe((response: any) => {
      this.localStorageService.SET_CODE((response.data.lid - 512));
      this.getProCodeData(fromTimer);
    }, error => {
      this.startChecking();
    });

  }

  getProCodeData(fromTimer = true) {
    this.codeApi.getCodeData().subscribe((codeData: any) => {
      this.localStorageService.SAVE_CODE_DATA(codeData);
      this.checkCodeExpiration(fromTimer);
    }, error => {
      this.startChecking();
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

