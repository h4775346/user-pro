import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {LocalStorageService} from '../other/local-storage.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {HttpErrorHandlerService} from './http-error-handler.service';
import {PageModel} from '../../Models/page-model';
import {TrafficModel} from '../../Models/traffic-model';
import {DashboardWarningService} from '../other/dashboard-warning.service';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private BaseIp = 'http://20.0.0.1/';
  private secret = 'abcdefghijuklmno0123456789012345';
  private BaseUrl = this.BaseIp + 'user/api/index.php/api/';
  private LoginUrl = this.BaseIp + 'user/api/index.php/api/auth/autoLogin';


  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router,
              private httpError: HttpErrorHandlerService, private warning: DashboardWarningService) {
  }

  autologin() {
    return this.http.get(this.LoginUrl);
  }

  getDashboard() {
    return this.http.get(this.BaseUrl + 'dashboard', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getService() {
    return this.http.get(this.BaseUrl + 'service', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getUserData() {
    return this.http.get(this.BaseUrl + 'user', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getAvailableExtensions(serviceId) {
    return this.http.get(this.BaseUrl + 'extensions/' + serviceId, this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getAvailablePackages() {
    return this.http.get(this.BaseUrl + 'packages', this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getExtensionData(extensionId) {
    return this.http.get(this.BaseUrl + 'package/' + extensionId, this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  chargeCard(data) {
    return this.http.post(this.BaseUrl + 'redeem', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  activateService(data) {
    return this.http.post(this.BaseUrl + 'user/activate', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  extendService(data) {
    return this.http.post(this.BaseUrl + 'user/extend', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  changeService(data) {
    return this.http.post(this.BaseUrl + 'service', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getInvoices(data: PageModel) {
    return this.http.post(this.BaseUrl + 'index/invoice', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getPayments(data: PageModel) {
    return this.http.post(this.BaseUrl + 'index/payment', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getTraffic(data: TrafficModel) {
    return this.http.post(this.BaseUrl + 'traffic', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getJournals(data: PageModel) {
    return this.http.post(this.BaseUrl + 'index/journal', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  getSessions(data: PageModel) {
    data.sortBy = 'radacctid';
    return this.http.post(this.BaseUrl + 'index/session', this.encrypt(JSON.stringify(data)), this.getHttpHeader()).pipe(
      catchError(this.httpError.handleError)
    );
  }

  encrypt(data) {
    console.log(JSON.parse(data));

    return {payload: CryptoJS.AES.encrypt(data, this.secret).toString()};
  }

  getKey() {
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
