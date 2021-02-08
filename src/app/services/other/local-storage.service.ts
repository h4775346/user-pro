import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';
import {UserDataModel} from '../../Models/user-data-model';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  arrUserData: UserDataModel[] = [];

  constructor(private router: Router) {
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

  SAVE_USER_DATA(userId: any, user: string, pass: any) {
    const data: UserDataModel = new UserDataModel(userId, user, pass);
    this.arrUserData = this.GET_ARR_USERS();
    console.log(this.arrUserData);
    if (!this.IS_USER_EXISTS(userId)) {
      this.arrUserData.push(data);
      this.SAVE_MAIN_USER(data);
    } else {
      this.SAVE_MAIN_USER(this.GET_USER_DATA(userId));
    }
    localStorage.setItem('users_data', JSON.stringify(this.arrUserData));
  }

  UPDATE_USER_DATA(id: any, data: UserDataModel) {
    this.arrUserData = this.GET_ARR_USERS();
    const foundIndex = this.arrUserData.findIndex(x => x.id === data.id);
    this.arrUserData[foundIndex] = data;
    console.log(data);
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
    const currentUser: UserDataModel = JSON.parse(localStorage.getItem('main_user'));
    return currentUser;
  }


  SAVE_CURRENT_USER_PASSWORD(password: any) {
    const id = this.GET_MAIN_USER_ID();
    const data: any = this.GET_USER_DATA(id);
    console.log(data);
    const newData: UserDataModel = new UserDataModel(id, data.username, password);
    this.UPDATE_USER_DATA(id, newData);
    this.SAVE_MAIN_USER(newData);
  }
}
