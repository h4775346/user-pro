import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';
import {UserDataModel} from '../../Models/user-data-model';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {UserApiService} from '../api/user-api.service';
import {UserLoginModel} from '../../Models/user-login-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static CODE_DATA;

  arrUserData: UserDataModel[] = [];


  constructor(private router: Router) {
  }

  public static REMOVE_KEY() {
    localStorage.removeItem('jwt');
  }

  public static setLastRoute(route) {
    localStorage.setItem('last_route', route);
  }

  public static getLastRoute(): string {
    const lastRoute = localStorage.getItem('last_route');
    if (lastRoute != null && lastRoute !== '/user' && lastRoute !== '') {
      return lastRoute;
    }
    return '/user/home';
  }

  public static SET_AUTO_LOGIN_STATUS(autologin = true) {
    localStorage.setItem('auto_login', autologin.toString());
  }

  SAVE_CODE_DATA(codeData) {
    LocalStorageService.CODE_DATA = codeData;
    this.SET_CODE(codeData.code);
    localStorage.setItem('code_data', JSON.stringify(LocalStorageService.CODE_DATA));
    localStorage.setItem('ip_in', codeData.ip_in);
    localStorage.setItem('ip_out', codeData.ip_out);
  }

  GET_CODE_DATA() {
    const codeData = localStorage.getItem('code_data');
    if (codeData != null) {
      return JSON.parse(codeData);
    }
    return false;
  }

  GET_REMOVE_CODE_DATA() {
    localStorage.removeItem('code_data');
    localStorage.removeItem('code');
  }

  SAVE_JWT_KEY(jwt) {
    localStorage.setItem('jwt', jwt);
  }

  GET_JWT_KEY() {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['user']);
      return null;
    }
    return localStorage.getItem('jwt');
  }

  JWT_EXISTED() {
    return localStorage.getItem('jwt') != null;
  }

  SAVE_USER_DATA(userId: any, user: string, pass: any) {
    const data: UserDataModel = new UserDataModel(userId, user, pass);
    this.arrUserData = this.GET_ARR_USERS();
    if (!this.IS_USER_EXISTS(userId)) {
      this.arrUserData.push(data);
      this.SAVE_MAIN_USER(data);
    } else {
      this.SAVE_MAIN_USER(data);
    }
    localStorage.setItem('users_data', JSON.stringify(this.arrUserData));
  }

  UPDATE_USER_DATA(id: any, data: UserDataModel) {
    this.arrUserData = this.GET_ARR_USERS();
    const foundIndex = this.arrUserData.findIndex(x => x.id === data.id);
    this.arrUserData[foundIndex] = data;
    localStorage.setItem('users_data', JSON.stringify(this.arrUserData));
  }

  GET_ARR_USERS() {
    if (localStorage.getItem('users_data') === null) {
      localStorage.setItem('users_data', '[]');
    }
    return JSON.parse(localStorage.getItem('users_data'));
  }

  GET_USER_DATA(id: any) {
    this.arrUserData = this.GET_ARR_USERS();
    const foundIndex = this.arrUserData.findIndex(x => x.id === id);
    console.log('Found user at  :' + foundIndex + 'srearching for id ' + id);
    if (foundIndex >= 0) {
      return this.arrUserData[foundIndex];
    } else {
      return null;
    }


  }

  IS_USER_EXISTS(id: any) {
    return this.arrUserData.findIndex(x => x.id === id) !== -1;
  }

  SET_AUTO_LOGIN_STATUS(autologin = true) {
    localStorage.setItem('auto_login', autologin.toString());
  }

  USER_AUTO_LOGIN() {
    const autoLogin = localStorage.getItem('auto_login');
    return autoLogin === 'true';
  }


  SAVE_MAIN_USER(user: UserDataModel) {
    localStorage.setItem('main_user', JSON.stringify(user));
  }

  GET_MAIN_USER_ID() {
    const currentUser: UserDataModel = JSON.parse(localStorage.getItem('main_user'));
    return parseInt(currentUser.id, 10);
  }

  GET_MAIN_USER() {
    const mainUser = localStorage.getItem('main_user');
    const currentUser: UserDataModel = JSON.parse(mainUser);
    return currentUser;
  }


  SAVE_CURRENT_USER_PASSWORD(password: any) {
    const id = this.GET_MAIN_USER_ID();
    const data: any = this.GET_USER_DATA(id);
    const newData: UserDataModel = new UserDataModel(id, data.username, password);
    this.UPDATE_USER_DATA(id, newData);
    this.SAVE_MAIN_USER(newData);
  }

  SET_CODE(code) {
    localStorage.setItem('code', code);
  }

  GET_CODE() {
    const code = localStorage.getItem('code');
    if (code == null) {
      return false;
    }
    return code;
  }

  SAVE_LOGIN_DATA(userLoginModel: UserLoginModel) {
    localStorage.setItem('username', userLoginModel.username);
    localStorage.setItem('password', userLoginModel.password);
  }

  GET_LOGIN_DATA() {
    const user = localStorage.getItem('username');
    const pass = localStorage.getItem('password');
    if (user == null || pass == null) {
      return false;
    }
    return {username: user, password: pass};
  }

  SET_LOGOUT_STATUS(status) {
    localStorage.setItem('logout', status);
  }

  IS_LOGGED_OUT() {
    const logoutStatus = localStorage.getItem('logout');
    if (logoutStatus == null || logoutStatus === 'false') {
      return false;
    }
    return logoutStatus;

  }

  SET_BASE_URL(url) {
    localStorage.setItem('base_url', url);
  }

  GET_BASE_URL() {
    const baseURL = localStorage.getItem('base_url');
    if (baseURL == null || baseURL === '') {
      this.SET_BASE_URL(UserApiService.AutoBaseIp);
      return UserApiService.AutoBaseIp;
    }
    return baseURL;
  }

  IS_ONLINE_LOGIN() {
    return localStorage.getItem('online') === 'true';
  }

  SET_ONLINE_LOGIN(status) {
    localStorage.setItem('online', status);
    if (status && this.GET_CODE_DATA()) {
      this.SET_BASE_URL(this.GET_CODE_DATA().ip_out);
    }
    if (!status && this.GET_CODE_DATA()) {
      this.SET_BASE_URL(this.GET_CODE_DATA().ip_in);
    }
  }
}
