import {Component, OnInit} from '@angular/core';
import {PageModel} from '../../../Models/page-model';
import {UserApiService} from '../../../services/api/user-api.service';
import {TrafficTransferService} from '../../../services/other/traffic-transfer.service';
import {LocalService} from '../../../services/api/local-service';

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

  constructor(private userApiService: UserApiService, public trafficConverter: TrafficTransferService, public locale: LocalService) {
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

  get_time_diff(startDate, endDate) {

    if (endDate == null) {
      return '';
    }

    startDate = new Date(startDate).getTime();
    endDate = new Date(endDate).getTime();

    if (isNaN(startDate)) {
      return '';
    }

    let milisecDiff;
    if (startDate < endDate) {
      milisecDiff = endDate - startDate;
    } else {
      milisecDiff = startDate - endDate;
    }

    const days = Math.floor(milisecDiff / 1000 / 60 / (60 * 24));

    const dateDiff = new Date(milisecDiff);

    return (days > 0 ? days + ` ${this.locale.get('days')} ` : '')
      + (dateDiff.getHours() > 0 ? dateDiff.getHours() + ` ${this.locale.get('hours')} ` : '')
      + (dateDiff.getMinutes() > 0 ? dateDiff.getMinutes() + ` ${this.locale.get('minutes')} ` : '');
  }

}
