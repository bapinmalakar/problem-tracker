import { UserAuthService } from './../shared/services/userAuth.service';
import { CookieService } from './../shared/cookies.service';
import { UserModelService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'pt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _userService: UserModelService, public _cookieService: CookieService, public _userAuthAervice: UserAuthService) {
    let userData = this._cookieService.getCookie(environment.userCookie);
    if (userData) {
      userData = JSON.parse(userData);
      this._userAuthAervice.getUser(userData._id)
        .subscribe(result => {
          console.log('Result isss: ', result);
          this._userService.setUser(result);
          console.log(typeof this._userService.getUser());
        }, err => {
          console.log('Error is: ', err);
        });
    }
  }

  ngOnInit() {
    console.log('Inside home component');
  }

}
