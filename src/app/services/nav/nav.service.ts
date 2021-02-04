import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      console.log(event.urlAfterRedirects);
    });

  }
}
