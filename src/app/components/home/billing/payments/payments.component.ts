import {Component, OnInit} from '@angular/core';
import {PageModel} from '../../../../Models/page-model';
import {UserApiService} from '../../../../services/api/user-api.service';
import {LocalService} from '../../../../services/api/local-service';
import {LocalStorageService} from '../../../../services/other/local-storage.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  pageModel: PageModel = new PageModel();
  paymentData = [];
  responseData;
  allPages = [];
  currentPage;
  pound;

  constructor(private userApiService: UserApiService, public locale: LocalService, public localStorageService: LocalStorageService) {
    this.pound = localStorageService.GET_POUND();
  }

  ngOnInit(): void {
    this.getPayments();
  }


  public getPayments(page = 1, count = 10) {
    this.pageModel.page = page;
    this.pageModel.count = count;
    this.responseData = null;
    this.userApiService.getPayments(this.pageModel).subscribe((response: any) => {
      this.paymentData = response.data;
      this.responseData = response;
      this.setPagination();
    });
  }

  private setPagination() {
    this.allPages = [];
    this.currentPage = Math.ceil(this.responseData.from / this.responseData.per_page);
    for (let i = 1; i <= Math.ceil(this.responseData.total / this.responseData.per_page); i++) {
      this.allPages.push(i);
    }
  }

}
