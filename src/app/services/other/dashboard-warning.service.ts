import {Injectable} from '@angular/core';
import {WarningModel} from '../../Models/warning-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardWarningService {

  warningsList: WarningModel[] = [];

  constructor() {
  }

  createWarning(message: string, type: string) {
    const warning: WarningModel = new WarningModel(message, type);
    this.warningsList.push(warning);
  }

  removeWarning(index: number) {
    this.warningsList.splice(index, 1);
  }

}
