import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {LocalStorageService} from '../other/local-storage.service';
import {Router} from '@angular/router';
import {catchError, timeout} from 'rxjs/operators';
import {HttpErrorHandlerService} from './http-error-handler.service';
import {PageModel} from '../../Models/page-model';
import {TrafficModel} from '../../Models/traffic-model';
import {DashboardWarningService} from '../other/dashboard-warning.service';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  public static BaseIp = 'http://20.0.0.1/';
  public static BaseUrl = UserApiService.BaseIp + 'user/api/index.php/api/';
  public static LoginUrl = UserApiService.BaseIp + 'user/api/index.php/api/auth/autoLogin';
  public static CodeDataUrl = UserApiService.BaseIp + 'admin/api/index.php/api/resources/login';
  private secret = 'abcdefghijuklmno0123456789012345';


  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router,
              private httpError: HttpErrorHandlerService, private warning: DashboardWarningService) {
  }

  getBaseUrl(forLogin = false) {
    const autoLogin = this.localStorageService.USER_AUTO_LOGIN();
    const LocalUrl = UserApiService.BaseIp;
    const codeData = this.localStorageService.GET_CODE_DATA();
    let path = 'user/api/index.php/api/';

    if (forLogin) {
      path = 'user/api/index.php/api/auth/login';
    }
    if (autoLogin) {
      if (codeData) {
        return codeData.ip_in + path;
      } else {
        return LocalUrl + path;
      }
    } else {
      if (codeData) {
        return codeData.ip_out + path;
      } else {
        return LocalUrl + path;
      }
    }
  }

  autologin() {
    return this.http.get(UserApiService.LoginUrl).pipe(timeout(3000));
  }

  login(data) {
    return this.http.post(this.getBaseUrl(true), this.encrypt(JSON.stringify(data)));
  }

  getAdminAutoCode() {
    return this.http.get(UserApiService.CodeDataUrl);
  }

  getDashboard() {
    return this.http.get(this.getBaseUrl() + 'dashboard', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getService() {
    return this.http.get(this.getBaseUrl() + 'service', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getUserData() {
    return this.http.get(this.getBaseUrl() + 'user', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getAvailableExtensions(serviceId) {
    return this.http.get(this.getBaseUrl() + 'extensions/' + serviceId, this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getAvailablePackages() {
    return this.http.get(this.getBaseUrl() + 'packages', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getExtensionData(extensionId) {
    return this.http.get(this.getBaseUrl() + 'package/' + extensionId, this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  chargeCard(data) {
    return this.http.post(this.getBaseUrl() + 'redeem', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  activateService(data) {
    return this.http.post(this.getBaseUrl() + 'user/activate', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  extendService(data) {
    return this.http.post(this.getBaseUrl() + 'user/extend', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  changeService(data) {
    return this.http.post(this.getBaseUrl() + 'service', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getInvoices(data: PageModel) {
    return this.http.post(this.getBaseUrl() + 'index/invoice', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getPayments(data: PageModel) {
    return this.http.post(this.getBaseUrl() + 'index/payment', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getTraffic(data: TrafficModel) {
    return this.http.post(this.getBaseUrl() + 'traffic', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getJournals(data: PageModel) {
    return this.http.post(this.getBaseUrl() + 'index/journal', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getSessions(data: PageModel) {
    data.sortBy = 'radacctid';
    return this.http.post(this.getBaseUrl() + 'index/session', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  encrypt(data) {
    console.log( [this.getBaseUrl()] , JSON.parse(data));

    return {payload: CryptoJS.AES.encrypt(data, this.secret).toString()};
  }

  getKey() {
    if (LocalStorageService.CODE_DATA && LocalStorageService.CODE_DATA.profile_status !== 'active') {
      console.log('Expired');
      this.router.navigate(['user', 'login']);
    }
    return this.localStorageService.GET_JWT_KEY();
  }

  getHttpHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getKey()
      })
    };

  }


}
