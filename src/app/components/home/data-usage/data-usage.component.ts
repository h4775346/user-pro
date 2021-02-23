import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChartService} from '../../../services/other/chart.service';
import {TrafficModel} from '../../../Models/traffic-model';
import {UserApiService} from '../../../services/api/user-api.service';
import {TrafficTransferService} from '../../../services/other/traffic-transfer.service';
import {LocalService} from '../../../services/api/local-service';

@Component({
  selector: 'app-data-usage',
  templateUrl: './data-usage.component.html',
  styleUrls: ['./data-usage.component.css']
})
export class DataUsageComponent implements OnInit, AfterViewInit {


  trafficModel: TrafficModel = new TrafficModel();
  trafficResponse;
  trafficData: any;

  constructor(public chartService: ChartService,
              private userApi: UserApiService,
              public trafficConverter: TrafficTransferService,
              public locale: LocalService) {
  }

  ngOnInit(): void {
    this.getData();

  }

  ngAfterViewInit(): void {
  }


  getFullYear() {
    return new Date().getFullYear();
  }

  getCurrentMonth() {
    const today = new Date();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    let mm2: string;
    if (mm < 10) {
      mm2 = '0' + mm;
    }
    return (yyyy + '-' + mm2);
  }

  getDate(day) {
    const today = new Date();
    const mm = (today.getMonth() + 1);
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + day;
  }

  getData() {
    this.trafficResponse = null;
    this.userApi.getTraffic(this.trafficModel).subscribe((response: any) => {
      this.trafficResponse = response;
      this.trafficData = response.data;
      this.chartService.setData(
        response.data.rx,
        response.data.tx,
        response.data.total,
        response.data.total_real,
        this.trafficModel
      );
    });

  }

}
