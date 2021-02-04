import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserApiService} from '../../services/api/user-api.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {LocalStorageService} from '../../services/other/local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading = true;
  currentText = 'Loading ...';

  constructor(private router: Router,
              private userApi: UserApiService,
              private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {

    this.testAutoLogin();
  }

  testAutoLogin() {

    this.userApi.autologin().subscribe((response: JsonObject) => {
      this.loading = false;
      if (response.status === 200) {
        this.localStorageService.SAVE_JWT_KEY(response.token);
        this.router.navigate(['user', 'home']);
      } else {
        this.currentText = response.message.toString();
      }
    }, (error) => {
      this.loading = false;
      console.log(error);
      this.currentText = error.message;
    });
  }

}
