import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {MessagePayload} from './notification-interfaces';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  messagingFirebase: firebase.messaging.Messaging;
  private messaginObservable = new Observable<MessagePayload>(observe => {
    this.messagingFirebase.onMessage(payload => {
      observe.next(payload);
    });
  });

  constructor() {
    firebase.initializeApp(environment.configFirebase);
    this.messagingFirebase = firebase.messaging();
  }

  requestPermission = () => {
    return new Promise(async (resolve, reject) => {
      const permsis = await Notification.requestPermission();
      if (permsis === 'granted') {
        const tokenFirebase = await this.messagingFirebase.getToken();
        resolve(tokenFirebase);
      } else {
        reject(new Error('No se otorgaron los permisos'));
      }
    });
  }


  receiveMessage(): any {
    return this.messaginObservable;
  }

}
