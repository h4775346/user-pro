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

  public static AutoBaseIp = 'http://20.0.0.1/';
  public static BaseIp = 'http://20.0.0.1/';
  public static ApiPath = 'user/api/index.php/api/';
  public static AutoLoginPath = 'user/api/index.php/api/auth/autoLogin';
  public static loginPath = 'user/api/index.php/api/auth/login';
  public static adminCodePath = 'admin/api/index.php/api/resources/login';
  public static logoPath = 'user/api/index.php/api/resources/logo';
  private secret = 'abcdefghijuklmno0123456789012345';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router,
              private httpError: HttpErrorHandlerService, private warning: DashboardWarningService) {
  }

  getBaseUrl(forLogo = false) {
    if (this.localStorageService.GET_CODE_DATA() && this.localStorageService.GET_CODE_DATA().profile_status !== 'active') {
      this.router.navigate(['user', 'login']);
      return;
    }
    if (forLogo) {
      return this.localStorageService.GET_BASE_URL() + UserApiService.logoPath;
    }
    return this.localStorageService.GET_BASE_URL();
  }

  autologin() {
    return this.http.get(UserApiService.AutoBaseIp + UserApiService.AutoLoginPath).pipe(timeout(3000));
  }

  login(data) {
    return this.http.post(this.getBaseUrl() + UserApiService.loginPath, this.encrypt(JSON.stringify(data)));
  }

  getAdminAutoCode() {
    return this.http.get(UserApiService.BaseIp + UserApiService.adminCodePath);
  }

  getDashboard() {
    return this.http.get(this.getBaseUrl() + UserApiService.ApiPath + 'dashboard', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getService() {
    return this.http.get(this.getBaseUrl() + UserApiService.ApiPath + 'service', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getUserData() {
    return this.http.get(this.getBaseUrl() + UserApiService.ApiPath + 'user', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getAvailableExtensions(serviceId) {
    return this.http.get(this.getBaseUrl() + UserApiService.ApiPath + 'extensions/' + serviceId, this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getAvailablePackages() {
    return this.http.get(this.getBaseUrl() + UserApiService.ApiPath + 'packages', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getExtensionData(extensionId) {
    return this.http.get(this.getBaseUrl() + UserApiService.ApiPath + 'package/' + extensionId, this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  chargeCard(data) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'redeem', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  activateService(data) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'user/activate', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  extendService(data) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'user/extend', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  changeService(data) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'service', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getInvoices(data: PageModel) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'index/invoice', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getPayments(data: PageModel) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'index/payment', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getTraffic(data: TrafficModel) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'traffic', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getJournals(data: PageModel) {
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'index/journal', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getSessions(data: PageModel) {
    data.sortBy = 'radacctid';
    return this.http.post(this.getBaseUrl() + UserApiService.ApiPath + 'index/session', this.encrypt(JSON.stringify(data)),
      this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  encrypt(data) {
    console.log([this.getBaseUrl()], JSON.parse(data));

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
