import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../../services/api/user-api.service';
import {LocalService} from '../../../../services/api/local-service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  constructor(private userApi: UserApiService, public locale: LocalService) {
  }

  userData;
  serviceData;
  title;
  message;
  color;
  elementType: 'url' | 'canvas' | 'img' = 'url';


  ngOnInit(): void {
    this.getServiceData();
    this.getUserData();
  }


  private getServiceData() {
    this.serviceData = null;
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
      this.checkServiceExpiration();
    });
  }

  private getUserData() {
    this.userData = null;
    this.userApi.getUserData().subscribe((response: any) => {
      this.userData = response.data;
    });
  }

  private checkServiceExpiration() {
    const active = this.serviceData.subscription_status.expiration;
    const haveTraffic = this.serviceData.subscription_status.traffic;

    if (active && haveTraffic) {
      this.applyTheme(this.locale.get('active_service'), this.locale.get('service_is_active'), '#0f6674');
    } else {
      if (!active) {
        this.applyTheme(this.locale.get('expired_service'), this.locale.get('service_is_expired'), '#e74343');
      } else {
        this.applyTheme(this.locale.get('depleted_service'), this.locale.get('service_is_depleted'), '#bf8537');
      }
    }
  }


  applyTheme(title, message, color) {
    this.title = title;
    this.message = message;
    this.color = color;
  }

}
