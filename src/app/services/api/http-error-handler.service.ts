import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {LocalStorageService} from '../other/local-storage.service';
import {Router} from '@angular/router';
import {NavService} from '../nav/nav.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  public static router: Router;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
    HttpErrorHandlerService.router = this.router;
  }


  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      switch (error.status) {
        case 0:
          LocalStorageService.SET_AUTO_LOGIN_STATUS(false);
          // LocalStorageService.REMOVE_KEY();
          LocalStorageService.setLastRoute(NavService.CURRENT_ROUTE);
          HttpErrorHandlerService.router.navigate(['user']).then(() => {
            window.location.reload();
          });
          break;
        case 401:
          console.log('Key Removed');
          LocalStorageService.REMOVE_KEY();
          LocalStorageService.setLastRoute(NavService.CURRENT_ROUTE);
          HttpErrorHandlerService.router.navigate(['user']).then(() => {
            window.location.reload();
          });
          break;
        default:
          console.log(error);
          console.log('Error Status ' + error.status);
          console.log('Error Message ' + error.message);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
