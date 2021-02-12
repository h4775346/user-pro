import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {LocalStorageService} from '../other/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public static CURRENT_ROUTE = '';

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      NavService.CURRENT_ROUTE = event.urlAfterRedirects;
      console.log(NavService.CURRENT_ROUTE);
    });

  }
}
