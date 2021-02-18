import {Component, OnInit} from '@angular/core';
import {PushNotificationService} from './services/other/notifications/push-notification.service';
import {CheckCodeService} from './services/other/check-code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-pro';

  constructor(private checkCodeService: CheckCodeService) {
    this.checkCodeService.startChecking();
  }

  // mesaggeReceived = '';
  //
  // constructor(private notificacion: PushNotificationService) {
  //   notificacion.requestPermission().then(token => {
  //     console.log(token);
  //   });
  // }
  //
  // ngOnInit() {
  //   this.notificacion.receiveMessage().subscribe(payload => {
  //     console.log(payload);
  //     this.mesaggeReceived = payload.notification.title;
  //   });
  // }
}
