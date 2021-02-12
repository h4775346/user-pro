import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PageModel} from '../../../../Models/page-model';
import {UserApiService} from '../../../../services/api/user-api.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, AfterViewInit {

  pageModel: PageModel = new PageModel();
  invoicesData = [];
  responseData;
  allPages = [];
  currentPage;

  constructor(private userApiService: UserApiService) {
  }

  ngOnInit(): void {
    this.getInvoices();
  }

  ngAfterViewInit(): void {

  }

  public getInvoices(page = 1, count = 10) {
    this.pageModel.page = page;
    this.pageModel.count = count;
    this.responseData = null;
    this.userApiService.getInvoices(this.pageModel).subscribe((response: any) => {
      this.invoicesData = response.data;
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
