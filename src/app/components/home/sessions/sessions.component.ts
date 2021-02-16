import {Component, OnInit} from '@angular/core';
import {PageModel} from '../../../Models/page-model';
import {UserApiService} from '../../../services/api/user-api.service';
import {TrafficTransferService} from '../../../services/other/traffic-transfer.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  pageModel: PageModel = new PageModel();
  sessionsData = [];
  responseData;
  allPages = [];
  currentPage;

  constructor(private userApiService: UserApiService, public trafficConverter: TrafficTransferService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }


  public getSessions(page = 1, count = 10) {
    this.pageModel.page = page;
    this.pageModel.count = count;
    this.responseData = null;
    this.userApiService.getSessions(this.pageModel).subscribe((response: any) => {
      this.sessionsData = response.data;
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
