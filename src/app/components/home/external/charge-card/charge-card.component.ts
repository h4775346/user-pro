import {Component, OnInit} from '@angular/core';
import {CardModel} from '../../../../Models/card-model';

@Component({
  selector: 'app-charge-card',
  templateUrl: './charge-card.component.html',
  styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent implements OnInit {

  constructor() {
  }
  loading = false;
  cardModel: CardModel = new CardModel();

  ngOnInit(): void {
  }

  chargeCard() {
    this.loading = true;
    console.log(this.cardModel);
  }
}
