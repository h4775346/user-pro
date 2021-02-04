import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(private router: Router) {
  }

  SAVE_JWT_KEY(jwt) {
    localStorage.setItem('jwt', jwt);
  }

  GET_JWT_KEY() {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['user']);
      return;
    }
    return localStorage.getItem('jwt');
  }

}
