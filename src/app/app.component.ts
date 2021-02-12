import {Component, OnInit} from '@angular/core';
import {PushNotificationService} from './services/other/notifications/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-pro';
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
