import {Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../../services/api/user-api.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  constructor(private userApi: UserApiService) {
  }

  serviceData;
  title;
  message;
  color;

  ngOnInit(): void {
    this.getServiceData();
  }


  private getServiceData() {
    this.serviceData = null;
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
      this.checkServiceExpiration();
    });
  }

  private checkServiceExpiration() {
    const active = this.serviceData.subscription_status.expiration;
    const haveTraffic = this.serviceData.subscription_status.traffic;

    if (active && haveTraffic) {
      this.applyTheme('Active Service', 'Your service is active and working fine', '#0f6674');
    } else {
      if (!active) {
        this.applyTheme('Expired Service', 'Your service is out of date please renew it', '#e74343');
      } else {
        this.applyTheme('depleted Service', 'Your service is depleted please extend or renew it', '#bf8537');
      }
    }
  }


  applyTheme(title, message, color) {
    this.title = title;
    this.message = message;
    this.color = color;
  }

}
