import {Injectable} from '@angular/core';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

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

  bytesToMBArray(array: Array<any>) {
    const myArr = array.slice();
    for (let i = 0; i < myArr.length; i++) {
      if (myArr[i] !== 0) {
        myArr[i] = (myArr[i] / 1048576).toFixed(0);
      }
    }
    return myArr;
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
