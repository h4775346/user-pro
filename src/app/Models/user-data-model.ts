export class UserDataModel {
  id: any;
  username: string;
  password: any;


  constructor(id: any, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
