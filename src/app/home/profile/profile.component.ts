import { environment } from './../../../environments/environment';
import { CookieService } from './../../shared/cookies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: any;
  constructor(public _cookieService: CookieService) {
    this.userDetails = this._cookieService.getCookie(environment.userCookie);
    if (this.userDetails) {
      this.userDetails = JSON.parse(this.userDetails);
      console.log('User Details is: ', this.userDetails);
    }
  }

  ngOnInit() {
  }

}
