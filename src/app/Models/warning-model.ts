export class WarningModel {
  public static WARNING_TYPES = {warning: 'alert-warning', success: 'alert-success'};
  message: string;
  type: string;


  constructor(message: string, type: string) {
    this.message = message;
    this.type = type;

  }
}
