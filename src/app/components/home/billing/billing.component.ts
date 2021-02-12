import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserApiService} from '../../../services/api/user-api.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit, AfterViewInit {

  constructor(private userApiService: UserApiService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
