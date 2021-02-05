import {Component, OnInit} from '@angular/core';
import {CardModel} from '../../../../Models/card-model';
import {UserApiService} from '../../../../services/api/user-api.service';
import {HttpResponse} from '@angular/common/http';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-charge-card',
  templateUrl: './charge-card.component.html',
  styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent implements OnInit {

  constructor(private userApi: UserApiService, public dialogRef: MatDialogRef<ChargeCardComponent>) {
  }

  loading = false;
  cardModel: CardModel = new CardModel();
  responseMessage = null;
  response = false;

  ngOnInit(): void {
  }

  chargeCard() {

    // console.log(this.cardModel);
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
        this.dialogRef.close({charge_ok: true, cardNumber: this.cardModel.pin});
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
