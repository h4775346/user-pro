import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../other/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  locale: any;
  dir = 'rtl';

  constructor(private http: HttpClient, private  localeStorageService: LocalStorageService) {
    if (!this.locale) {
      this.getLocaleData();
    }
  }

  get(key) {
    if ( this.locale && this.locale[key]) {
      return this.locale[key];
    }
    return '';
  }

  change(lang) {
    this.localeStorageService.SET_LOCALE(lang);
    this.getLocaleData();
  }

  private getLocaleData() {
    this.http.get('assets/locale/' + this.localeStorageService.GET_LOCALE() + '.json').subscribe((response: any) => {
      this.locale = response;
      this.dir = response.dir;
    });
  }
}
