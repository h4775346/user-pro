import {Injectable} from '@angular/core';
import {WarningModel} from '../../Models/warning-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardWarningService {

  warningsList: WarningModel[] = [
    new WarningModel('this is warning 1', WarningModel.WARNING_TYPES.warning),
    new WarningModel('this is warning 2', WarningModel.WARNING_TYPES.success ),
  ];

  constructor() {
  }

  createWarning(message: string, type: string) {
    const warning: WarningModel = new WarningModel(message, type);
    this.warningsList.push(warning);
  }

  removeWarning(index: number) {
    console.log('Before Removing');
    console.log(this.warningsList);
    this.warningsList.splice(index, 1);
    console.log('After Removing');
    console.log(this.warningsList);
  }

}
