import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../services/api/user-api.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {TrafficTransferService} from '../../../services/other/traffic-transfer.service';
import {MatDialog} from '@angular/material/dialog';
import {ChargeCardComponent} from '../external/charge-card/charge-card.component';
import {DashboardWarningService} from '../../../services/other/dashboard-warning.service';
import {WarningModel} from '../../../Models/warning-model';
import {ActivateServiceComponent} from '../external/activate-service/activate-service.component';
import {ExtendServiceComponent} from '../external/extend-service/extend-service.component';
import {LocalStorageService} from '../../../services/other/local-storage.service';
import {LocalService} from '../../../services/api/local-service';
import {DialogsService} from '../../../services/other/dialogs-service';

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
              private warningService: DashboardWarningService,
              public localStorageService: LocalStorageService,
              public locale: LocalService,
              private dialogsService: DialogsService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getAllData();
  }

  private getAllData() {


    this.getDashboardData();
    this.getServiceData();
    this.getUserData();
  }

  private getDashboardData() {
    this.dashboardData = null;
    this.userApi.getDashboard().subscribe((response: any) => {
      this.dashboardData = response.data;
    });
  }

  private getServiceData() {
    this.serviceData = null;
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
      this.checkServiceExpiration();
    });
  }

  private getUserData() {
    this.userData = null;
    this.userApi.getUserData().subscribe((response: any) => {
      this.userData = response.data;
      this.saveLoginData();
    });
  }

  saveLoginData() {
    if (this.localStorageService.USER_AUTO_LOGIN()) {
      this.localStorageService.SAVE_USER_DATA(this.userData.id, this.userData.username, true);
    } else {
      const user = this.localStorageService.GET_LOGIN_DATA();
      if (user === false) {
        return;
      }
      console.log(user);
      this.localStorageService.SAVE_USER_DATA(this.userData.id, user.username, user.password);
      this.localStorageService.SAVE_CURRENT_USER_PASSWORD(user.password);
    }
  }


  openChargeCardDialog() {
    const dialogRef = this.dialog.open(ChargeCardComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        if (response.charge_ok) {
          this.warningService.createWarning('Card Number ( ' + response.cardNumber + ' ) Charged Successfully!',
            WarningModel.WARNING_TYPES.success);
          this.getAllData();
        }
      }
    });
  }


  openActivateServiceDialog() {
    const dialogRef = this.dialog.open(ActivateServiceComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        if (response.activate_ok) {
          this.warningService.createWarning(
            'Service Activated ( ' + response.service_name + ' ) Successfully!',
            WarningModel.WARNING_TYPES.success
          );
          this.getAllData();
        }
      }
    });
  }


  openExtendService() {
    const dialogRef = this.dialog.open(ExtendServiceComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      width: '90vh',
      data: {service_id: this.serviceData.profile_id}
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        if (response.extend_ok) {
          this.warningService.createWarning(
            'Service Extended ( ' + response.service_name + ' ) Successfully!',
            WarningModel.WARNING_TYPES.success
          );
          this.getAllData();
        }
      }
    });
  }


  private checkServiceExpiration() {
    const active = this.serviceData.subscription_status.expiration;
    const haveTraffic = this.serviceData.subscription_status.traffic;
    if (!active || !haveTraffic) {
      this.dialogsService.showEndDialog();
    }
  }


}
