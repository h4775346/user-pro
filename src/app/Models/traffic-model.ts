export class TrafficModel {
  // tslint:disable-next-line:variable-name
  report_type = 'daily';
  month;
  year;
  // tslint:disable-next-line:variable-name
  user_id;

  constructor() {
    const date: Date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    console.log('Month' + this.month);
  }

  setMonthData(element) {
    const date: Date = new Date(element.value);
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  }
}
