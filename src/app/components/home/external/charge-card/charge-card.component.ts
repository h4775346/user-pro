import {Component, OnInit} from '@angular/core';
import {CardModel} from '../../../../Models/card-model';
import {UserApiService} from '../../../../services/api/user-api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {WarningModel} from '../../../../Models/warning-model';
import {DashboardWarningService} from '../../../../services/other/dashboard-warning.service';
import {Router} from '@angular/router';
import {LocalService} from '../../../../services/api/local-service';
import {DialogsService} from '../../../../services/other/dialogs-service';

@Component({
  selector: 'app-charge-card',
  templateUrl: './charge-card.component.html',
  styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent implements OnInit {

  constructor(private userApi: UserApiService, private warningService: DashboardWarningService,
              private router: Router,
              public locale: LocalService,
              public dialogsService: DialogsService) {
  }

  loading = false;
  cardModel: CardModel = new CardModel();
  responseMessage = null;
  response = false;

  ngOnInit(): void {
  }

  chargeCard() {
    this.loading = true;
    this.responseMessage = null;
    this.userApi.chargeCard(this.cardModel).subscribe((response: any) => {
        this.loading = false;
        this.response = response;
        this.answerData(response.status);
      }
      , error => {
        this.loading = false;
        console.log(error);
      });

  }


  answerData(response: any) {
    switch (response) {

      case -2:
        this.responseMessage = this.locale.get('wrong_card');
        break;
      case -5:
        this.responseMessage = this.locale.get('used_card');
        break;
      case 200:


        this.warningService.createWarning(this.locale.get('card_number') + ' ' + this.cardModel.pin + this.locale.get('card_charged'),
          WarningModel.WARNING_TYPES.success);


        this.dialogsService.showMessage(
          this.locale.get('successful_process'), this.locale.get('card_number') +
          ' ' + this.cardModel.pin + this.locale.get('card_charged'));


        this.router.navigate(['user', 'home', 'dashboard']);
        break;
      case -4:
        this.responseMessage = this.locale.get('suspended_card');
        break;
      default:
        this.responseMessage = response.message;
        break;
    }
  }
}
