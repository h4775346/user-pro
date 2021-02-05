import {Component, Input, OnInit} from '@angular/core';
import {DashboardWarningService} from '../../../../../services/other/dashboard-warning.service';
import {WarningModel} from '../../../../../Models/warning-model';

@Component({
  selector: 'app-dashboard-warning',
  templateUrl: './dashboard-warning.component.html',
  styleUrls: ['./dashboard-warning.component.css']
})
export class DashboardWarningComponent implements OnInit {


  // tslint:disable-next-line:no-input-rename
  @Input('warning') warning: WarningModel;
  // tslint:disable-next-line:no-input-rename
  @Input('warningIndex') index: number;

  constructor(private warningService: DashboardWarningService) {
  }

  ngOnInit(): void {
  }

  removeWarning() {
    this.warningService.removeWarning(this.index);
  }
}
