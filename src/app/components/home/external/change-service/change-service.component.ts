import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../../services/api/user-api.service';
import {DialogsService} from '../../../../services/other/dialogs-service';
import {v4 as uuidv4} from 'uuid';
import {DashboardWarningService} from '../../../../services/other/dashboard-warning.service';
import {WarningModel} from '../../../../Models/warning-model';
import {LocalStorageService} from '../../../../services/other/local-storage.service';
import {LocalService} from '../../../../services/api/local-service';


@Component({
  selector: 'app-change-service',
  templateUrl: './change-service.component.html',
  styleUrls: ['./change-service.component.css']
})
export class ChangeServiceComponent implements OnInit, AfterViewInit {
  serviceData = null;
  availablePackages = [];
  selectedService;
  loading = false;

  constructor(
    private userApi: UserApiService,
    private dialogsService: DialogsService,
    private warningService: DashboardWarningService,
    private localStorageService: LocalStorageService,
    public locale: LocalService) {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.getServiceData();
    this.getAvailablePackages();
  }

  private getServiceData() {
    this.serviceData = null;
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
    });
  }

  private getAvailablePackages() {
    this.availablePackages = [];
    this.userApi.getAvailablePackages().subscribe((response: any) => {
      this.availablePackages = response.data;
    });
  }

  changeService(service) {
    this.selectedService = service;
    this.dialogsService.requestConfirmation(
      this.locale.get('extend_service'),
      this.locale.get('you_will_change_service') + ' ' + service.name
    )
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.startChangingService();
        }
      });
  }


  startChangingService(password = this.localStorageService.GET_MAIN_USER().password) {
    this.loading = true;
    this.userApi.changeService({
      new_service: this.selectedService.id,
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
            this.locale.get('service_changed') + this.selectedService.name,
            WarningModel.WARNING_TYPES.success
          );
          this.dialogsService.showMessage(
            this.locale.get('successful_process'), this.locale.get('service_changed') + this.selectedService.name);
          this.ngAfterViewInit();
          break;
        case -1:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }

          if (response.message === 'rsp_service_change_user_active') {
            this.dialogsService.showMessage(
              this.locale.get('something_went_wrong'), this.locale.get('cant_change_service_in_active_user'));
          } else {
            this.warningService.createWarning(
              response.message,
              WarningModel.WARNING_TYPES.warning);
          }
          break;
        case -5:
          if (password === true) {
            this.requestPassword();
          } else {
            this.dialogsService.showMessage(
              this.locale.get('something_went_wrong'), this.locale.get('invalid_password'));
          }
          break;

        default:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }
          this.dialogsService.showMessage(
            this.locale.get('something_went_wrong'), response.message);
          break;
      }
    });
  }


  private requestPassword() {
    const mainUser = this.localStorageService.GET_MAIN_USER();
    if (mainUser.password !== true) {
      this.startChangingService(mainUser.password);
      return;
    }
    this.dialogsService.requestInput(this.locale.get('password'), this.locale.get('enter_password'), 'password').subscribe(response => {
      if (response) {
        this.startChangingService(response.text);
      }
    });
  }


}
