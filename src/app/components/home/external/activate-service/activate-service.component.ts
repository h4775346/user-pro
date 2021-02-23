import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../../services/api/user-api.service';
import {DialogsService} from '../../../../services/other/dialogs-service';
import {v4 as uuidv4} from 'uuid';
import {LocalStorageService} from '../../../../services/other/local-storage.service';
import {WarningModel} from '../../../../Models/warning-model';
import {DashboardWarningService} from '../../../../services/other/dashboard-warning.service';
import {Router} from '@angular/router';
import {LocalService} from '../../../../services/api/local-service';

@Component({
  selector: 'app-activate-service',
  templateUrl: './activate-service.component.html',
  styleUrls: ['./activate-service.component.css']
})
export class ActivateServiceComponent implements OnInit, AfterViewInit {
  userData = null;
  serviceData = null;
  loading = false;

  responseMessage = null;

  constructor(private userApi: UserApiService,
              private confirmService: DialogsService,
              private localStorageService: LocalStorageService,
              private warningService: DashboardWarningService,
              private router: Router,
              public locale: LocalService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getData();
  }

  private getData() {

    this.getUserData();
    this.getServiceData();
  }

  private getUserData() {
    this.userApi.getUserData().subscribe((response: any) => {
      this.userData = response.data;
    });
  }


  private getServiceData() {
    this.userApi.getService().subscribe((response: any) => {
      this.serviceData = response.data;
    });
  }

  activateService() {

    this.confirmService.requestConfirmation(
      this.locale.get('activate_current'),
      this.locale.get('you_will_activate') + ' ' + this.serviceData.profile_name + ' ' +
      this.locale.get('and_pay') + ' ' + this.serviceData.price)
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.startActivatingService();
        }
      });

  }


  private startActivatingService(password = this.localStorageService.GET_MAIN_USER().password) {
    this.loading = true;
    this.userApi.activateService({uuid: uuidv4(), current_password: password}).subscribe((response: any) => {
      this.loading = false;
      switch (response.status) {
        case 200:
          if (password !== true) {
            this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
          }
          this.showDoneMessage();
          break;
        case -1:
          if (response.message === 'rsp_invalid_password') {
            if (password === true) {
              this.requestPassword();
            } else {
              this.responseMessage = this.locale.get('invalid_password');
            }
          } else {
            if (password !== true) {
              this.localStorageService.SAVE_CURRENT_USER_PASSWORD(password);
            }
            if (response.message === 'rsp_insufficient_balance') {
              this.responseMessage = this.locale.get('mybe_you_dont_have_enaugh');
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
      this.startActivatingService(mainUser.password);
      return;
    }
    this.confirmService.requestInput(this.locale.get('password'), this.locale.get('enter_password'),
      'password').subscribe(response => {
      if (response) {
        this.startActivatingService(response.text);
      }
    });
  }


  private showDoneMessage() {
    this.warningService.createWarning(
       this.serviceData.profile_name +  ' ' + this.locale.get('activated_successfully'),
      WarningModel.WARNING_TYPES.success
    );
    this.router.navigate(['user', 'home', 'dashboard']);
  }
}
