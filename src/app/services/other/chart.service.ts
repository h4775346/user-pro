import {Injectable} from '@angular/core';
import {TrafficModel} from '../../Models/traffic-model';
import {TrafficTransferService} from './traffic-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private trafficConverter: TrafficTransferService) {
  }

  chartType = 'line';
  chartDatasets: Array<any> = new Array<any>();


  monthlyUsageLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'Oct', 'Nov', 'Dec'];

  dailyUsageLabels: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  currentUsageLabels = this.monthlyUsageLabels;

  chartColors: Array<any> = [

    {
      backgroundColor: '#3d93c8',
      borderColor: '#11364e',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(27, 107, 121, 0.404)',
      borderColor: '#074128',
      borderWidth: 2,
    }
    ,
    {
      backgroundColor: '#7EBFBC',
      borderColor: '#2f5654',
      borderWidth: 2,
    }

  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(e: any): void {
  }

  chartHovered(e: any): void {
  }

  setData(download, upload, total, real, trafficModel: TrafficModel) {

    if (trafficModel.report_type === 'daily') {
      this.setDays(trafficModel.month, trafficModel.year);
    } else {
      this.setMonths();
    }

    this.chartDatasets = [
      {data: this.trafficConverter.bytesToMBArray(download), label: 'Download(MB)'},
      {data: this.trafficConverter.bytesToMBArray(upload), label: 'Upload(MB)'},
      {data: this.trafficConverter.bytesToMBArray(total), label: 'total(MB)'},
      {data: this.trafficConverter.bytesToMBArray(real), label: 'real(MB)'},
    ];


  }

  setDays(month, year) {
    // this.dailyUsageLabels = [];
    // for (let i = 1; i <= this.daysInMonth(month, year); i++) {
    //   this.dailyUsageLabels.push(i);
    // }
    this.currentUsageLabels = this.dailyUsageLabels;
  }

  setMonths() {
    this.currentUsageLabels = this.monthlyUsageLabels;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getFullYear() + '-' + new Date(date).getFullYear());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }


}
