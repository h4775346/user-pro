import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../services/api/user-api.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {TrafficTransferService} from '../../../services/other/traffic-transfer.service';
import {MatDialog} from '@angular/material/dialog';
import {ChargeCardComponent} from '../external/charge-card/charge-card.component';
import {DashboardWarningService} from '../../../services/other/dashboard-warning.service';
import {WarningModel} from '../../../Models/warning-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dashboardData = null;
  userData = null;
  serviceData = null;

  constructor(private userApi: UserApiService,
              public trafficTransfer: TrafficTransferService,
              public dialog: MatDialog,
              private warningService: DashboardWarningService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getAllData();
  }

  private getAllData() {
    this.dashboardData = null;
    this.userData = null;
    this.serviceData = null;
    this.getDashboardData();
    this.getServiceData();
    this.getUserData();
  }

  private getDashboardData() {
    this.userApi.getDashboard().subscribe((response: any) => {
      this.dashboardData = response.data;
    });
  }

  private getServiceData() {
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
    });
  }

  private getUserData() {
    this.userApi.getUserData().subscribe((response: any) => {
      this.userData = response.data;
    });
  }


  openChargeCardDialog() {
    const dialogRef = this.dialog.open(ChargeCardComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response.charge_ok) {
        this.warningService.createWarning('Card Number ( ' + response.cardNumber + ' ) Charged Successfully!',
          WarningModel.WARNING_TYPES.success);
        this.ngOnInit();
      }
    });
  }


}
