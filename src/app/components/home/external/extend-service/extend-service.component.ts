import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserApiService} from '../../../../services/api/user-api.service';
import {TrafficTransferService} from '../../../../services/other/traffic-transfer.service';
import {v4 as uuidv4} from 'uuid';
import {DialogsService} from '../../../../services/other/dialogs-service';
import {HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from '../../../../services/other/local-storage.service';
import {WarningModel} from '../../../../Models/warning-model';
import {DashboardWarningService} from '../../../../services/other/dashboard-warning.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-extend-service',
  templateUrl: './extend-service.component.html',
  styleUrls: ['./extend-service.component.css']
})
export class ExtendServiceComponent implements OnInit, AfterViewInit {

  profileId = 1;
  extensions: Array<any>;
  selectedExtensionId = -1;
  extensionLoading = false;
  extensionData;
  loading = false;
  responseMessage;
  serviceData;

  constructor(
    private userApi: UserApiService,
    public trafficTrans: TrafficTransferService,
    private confirmService: DialogsService,
    private localStorageService: LocalStorageService,
    private warningService: DashboardWarningService,
    private router: Router) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getServiceData();
  }

  private getServiceData() {
    this.serviceData = null;
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
      this.profileId = this.serviceData.service_id;
      this.getAvailableExtensions();
    });
  }

  getAvailableExtensions() {
    this.userApi.getAvailableExtensions(this.profileId).subscribe((response: any) => {
      this.extensions = response.data;
    });
  }


  getExtensionData() {
    this.responseMessage = null;
    this.extensionLoading = true;
    this.userApi.getExtensionData(this.selectedExtensionId).subscribe((response: any) => {
      this.extensionLoading = false;
      this.extensionData = response.data;
    });
  }


  getFloatOf(num) {
    return parseFloat(num);
  }


  extendService() {
    this.confirmService.requestConfirmation(
      'Extending Service',
      'You will Extend' + ' ' + this.extensionData.name + ' ' + 'and pay' + ' ' + this.getFloatOf(this.extensionData.price))
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.startExtending();
        }
      });
  }


  startExtending(password = this.localStorageService.GET_MAIN_USER().password) {


    this.loading = true;

    this.userApi.extendService({
      profile_id: this.selectedExtensionId,
      uuid: uuidv4(),
      current_password: password
    }).subscribe((response: any) => {
      this.loading = false;
      switch (response.status) {
        case 200:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }
          this.warningService.createWarning(
            'Service Extended ( ' + this.extensionData.name + ' ) Successfully!',
            WarningModel.WARNING_TYPES.success
          );
          this.router.navigate(['user', 'home', 'dashboard']);
          break;
        case -1:
          if (response.message === 'rsp_invalid_password') {
            if (password === true) {
              this.requestPassword();
            } else {
              this.responseMessage = 'Invalid Password';
            }
          } else {
            if (password !== true) {
              this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
            }
            if (response.message === 'rsp_insufficient_balance') {
              this.responseMessage = 'You Dont Have Enough Balance';
            } else {
              this.responseMessage = response.message;
            }
          }
          break;
        default:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }
          this.responseMessage = response.message;
          break;
      }
    });
  }


  private requestPassword() {
    const mainUser = this.localStorageService.GET_MAIN_USER();
    if (mainUser.password !== true) {
      this.startExtending(mainUser.password);
      return;
    }
    this.confirmService.requestInput('Your Account Password', 'Enter Password', 'password').subscribe(response => {
      if (response) {
        this.startExtending(response.text);
      }
    });
  }
}
