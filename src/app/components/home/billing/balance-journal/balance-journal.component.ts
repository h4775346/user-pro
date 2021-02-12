import { Component, OnInit } from '@angular/core';
import {PageModel} from '../../../../Models/page-model';
import {UserApiService} from '../../../../services/api/user-api.service';

@Component({
  selector: 'app-balance-journal',
  templateUrl: './balance-journal.component.html',
  styleUrls: ['./balance-journal.component.css']
})
export class BalanceJournalComponent implements OnInit {

  pageModel: PageModel = new PageModel();
  JournalsData = [];
  responseData;
  allPages = [];
  currentPage;

  constructor(private userApiService: UserApiService) {
  }

  ngOnInit(): void {
    this.getJournals();
  }


  public getJournals(page = 1, count = 10) {
    this.pageModel.page = page;
    this.pageModel.count = count;
    this.responseData = null;
    this.userApiService.getJournals(this.pageModel).subscribe((response: any) => {
      this.JournalsData = response.data;
      this.responseData = response;
      this.setPagination();
    });
  }

  private setPagination() {
    this.allPages = [];
    this.currentPage = this.responseData.current_page;
    for (let i = 1; i <= Math.ceil(this.responseData.total / this.pageModel.count); i++) {
      this.allPages.push(i);
    }
  }

}
