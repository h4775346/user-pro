import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {LocalStorageService} from '../other/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private BaseIp = 'https://192.168.77.77/';
  private secret = 'abcdefghijuklmno0123456789012345';
  private BaseUrl = this.BaseIp + 'user/api/index.php/api/';
  private LoginUrl = this.BaseIp + 'user/api/index.php/api/auth/autoLogin';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getKey()
    })
  };

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  autologin() {
    return this.http.get(this.LoginUrl);
  }

  getDashboard() {
    return this.http.get(this.BaseUrl + 'dashboard', this.httpHeader);
  }
  getService() {
    return this.http.get(this.BaseUrl + 'service', this.httpHeader);
  }
  getUserData() {
    return this.http.get(this.BaseUrl + 'user', this.httpHeader);
  }
  encrypt(data) {
    return CryptoJS.AES.encrypt(data, this.secret).toString();
  }

  getKey() {
    return this.localStorageService.GET_JWT_KEY();
  }

}
