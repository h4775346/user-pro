import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {LocalStorageService} from '../other/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private BaseIp = 'http://20.0.0.1/';
  private secret = 'abcdefghijuklmno0123456789012345';
  private BaseUrl = this.BaseIp + 'user/api/index.php/api/';
  private LoginUrl = this.BaseIp + 'user/api/index.php/api/auth/autoLogin';


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  autologin() {
    return this.http.get(this.LoginUrl);
  }

  getDashboard() {
    return this.http.get(this.BaseUrl + 'dashboard', this.getHttpHeader());
  }

  getService() {
    return this.http.get(this.BaseUrl + 'service', this.getHttpHeader());
  }

  getUserData() {
    return this.http.get(this.BaseUrl + 'user', this.getHttpHeader());
  }

  getAvailableExtensions(serviceId) {
    return this.http.get(this.BaseUrl + 'extensions/' + serviceId, this.getHttpHeader());
  }

  getAvailablePackages() {
    return this.http.get(this.BaseUrl + 'packages', this.getHttpHeader());
  }

  getExtensionData(extensionId) {
    return this.http.get(this.BaseUrl + 'package/' + extensionId, this.getHttpHeader());
  }

  chargeCard(data) {
    return this.http.post(this.BaseUrl + 'redeem', this.encrypt(JSON.stringify(data)), this.getHttpHeader());
  }

  activateService(data) {
    return this.http.post(this.BaseUrl + 'user/activate', this.encrypt(JSON.stringify(data)), this.getHttpHeader());
  }

  extendService(data) {
    return this.http.post(this.BaseUrl + 'user/extend', this.encrypt(JSON.stringify(data)), this.getHttpHeader());
  }
  changeService(data) {
    return this.http.post(this.BaseUrl + 'service', this.encrypt(JSON.stringify(data)), this.getHttpHeader());
  }

  encrypt(data) {
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
