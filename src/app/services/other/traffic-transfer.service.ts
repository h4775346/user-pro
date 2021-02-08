import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrafficTransferService {
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  constructor() {
  }

  bytesToSize(bytes) {

    if (bytes === 0) {
      return 'n/a';
    }
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
    if (i === 0) {
      return `${bytes} ${this.sizes[i]})`;
    }
    return `${(bytes / (1024 ** i)).toFixed(1)} ${this.sizes[i]}`;
  }


  MegaToSize(bytes) {
    bytes *= 1048576;

    if (bytes === 0) {
      return 'n/a';
    }
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
    if (i === 0) {
      return `${bytes} ${this.sizes[i]})`;
    }
    return `${(bytes / (1024 ** i)).toFixed(1)} ${this.sizes[i]}`;
  }
}
