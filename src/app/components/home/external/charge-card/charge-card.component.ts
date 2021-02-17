import {Component, OnInit} from '@angular/core';
import {CardModel} from '../../../../Models/card-model';
import {UserApiService} from '../../../../services/api/user-api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {WarningModel} from '../../../../Models/warning-model';
import {DashboardWarningService} from '../../../../services/other/dashboard-warning.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-charge-card',
  templateUrl: './charge-card.component.html',
  styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent implements OnInit {

  constructor(private userApi: UserApiService, private warningService: DashboardWarningService,
              private router: Router) {
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
        this.responseMessage = 'Wrong Card';
        break;
      case -5:
        this.responseMessage = 'Used Card';
        break;
      case 200:
        this.warningService.createWarning('Card Number ( ' + this.cardModel.pin + ' ) Charged Successfully!',
          WarningModel.WARNING_TYPES.success);
        this.router.navigate(['user', 'home', 'dashboard']);
        break;
      case -4:
        this.responseMessage = 'Suspended Card';
        break;
      default:
        this.responseMessage = response.message;
        break;
    }
  }
}
