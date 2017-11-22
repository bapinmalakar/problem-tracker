import { UserAuthService } from './../../../../shared/services/userAuth.service';
import { CookieService } from './../../../../shared/cookies.service';
import { UserModelService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'pt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _userModelService: UserModelService,
    public _cookieService: CookieService,
    private _userAuthService: UserAuthService,
    private _navigate: Router) { }

  ngOnInit() {
    console.log('userrrrr=> ', this._userModelService.getUser());
  }
  logout() {
    this._cookieService.setCookie(environment.userCookie, '', -1);
    this._userAuthService.logout(this._userModelService.getUser()._id)
      .subscribe(result => {
        console.log('Logout result: ', result);
        this._navigate.navigate(['/']);
      }, err => {
        console.log('Error: ', err);
      })
  }

}
