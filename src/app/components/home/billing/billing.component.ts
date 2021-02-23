import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../services/api/user-api.service';
import {LocalService} from '../../../services/api/local-service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit, AfterViewInit {

  constructor(public locale: LocalService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
