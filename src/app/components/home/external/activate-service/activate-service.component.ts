import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../../services/api/user-api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogsService} from '../../../../services/other/dialogs-service';
import {v4 as uuidv4} from 'uuid';
import {LocalStorageService} from '../../../../services/other/local-storage.service';

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

  constructor(private userApi: UserApiService, public dialogRef: MatDialogRef<ActivateServiceComponent>,
              private confirmService: DialogsService,
              private localStorageService: LocalStorageService) {

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
      'Activating Service',
      'You will activate' + ' ' + this.serviceData.profile_name + ' ' + 'and pay' + ' ' + this.serviceData.price)
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
          this.dialogRef.close({activate_ok: true, service_name: this.serviceData.profile_name});
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
      this.startActivatingService(mainUser.password);
      return;
    }
    this.confirmService.requestInput('Your Account Password', 'Enter Password', 'password').subscribe(response => {
      if (response) {
        this.startActivatingService(response.text);
      }
    });
  }


}
