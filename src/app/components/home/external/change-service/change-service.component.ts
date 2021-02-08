import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../../services/api/user-api.service';
import {DialogsService} from '../../../../services/other/dialogs-service';
import {v4 as uuidv4} from 'uuid';
import {DashboardWarningService} from '../../../../services/other/dashboard-warning.service';
import {WarningModel} from '../../../../Models/warning-model';
import {LocalStorageService} from '../../../../services/other/local-storage.service';


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
    private localStorageService: LocalStorageService) {
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
      'Extending Service',
      'You will change your service to' + ' ' + service.name
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
            'Your service changed to (' + this.selectedService.name + ')',
            WarningModel.WARNING_TYPES.success
          );
          this.dialogsService.showMessage(
            'successfull process', 'Your service changed to (' + this.selectedService.name + ')');
          this.ngAfterViewInit();
          break;
        case -1:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }

          if (response.message === 'rsp_service_change_user_active') {
            this.dialogsService.showMessage(
              'something went wrong', 'Your Are Still Active, You can not change service now');
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
              'something went wrong', 'Invalid Password');
          }
          break;

        default:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }
          this.dialogsService.showMessage(
            'something went wrong', response.message);
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
    this.dialogsService.requestInput('Your Account Password', 'Enter Password', 'password').subscribe(response => {
      if (response) {
        this.startChangingService(response.text);
      }
    });
  }


}
