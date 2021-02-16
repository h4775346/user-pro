import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChartService} from '../../../services/other/chart.service';
import {TrafficModel} from '../../../Models/traffic-model';
import {UserApiService} from '../../../services/api/user-api.service';
import {TrafficTransferService} from '../../../services/other/traffic-transfer.service';

@Component({
  selector: 'app-data-usage',
  templateUrl: './data-usage.component.html',
  styleUrls: ['./data-usage.component.css']
})
export class DataUsageComponent implements OnInit, AfterViewInit {


  trafficModel: TrafficModel = new TrafficModel();
  trafficResponse;
  trafficData: any;

  uploadArray;
  downloadArray;
  totalArray;
  realArray;

  constructor(public chartService: ChartService, private userApi: UserApiService, public trafficConverter: TrafficTransferService) {
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
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm;
  }

  getData() {
    this.trafficResponse = null;
    this.userApi.getTraffic(this.trafficModel).subscribe((response: any) => {
      this.trafficResponse = response;
      this.trafficData = response.data;
      this.createTrafficArr();
      this.chartService.setData(
        response.data.rx,
        response.data.tx,
        response.data.total,
        response.data.total_real,
        this.trafficModel
      );
    });

  }

  createTrafficArr() {
    this.uploadArray = this.trafficData.tx;
    this.downloadArray = this.trafficData.rx;
    this.totalArray = this.trafficData.total;
    this.realArray = this.trafficData.total_real;
  }
}
