import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from '../../cookies.service';

@Injectable()
export class UserService implements CanActivate {
  constructor(private _navigate: Router, private _cookieService: CookieService) { }
  canActivate() {
    const userDetails = this._cookieService.getCookie(environment.userCookie);
    console.log('User cookie details: ', userDetails);
    if (!userDetails) {
      alert('Not Found');
      this._navigate.navigate(['/errorpage']);
      return false;
    } else {
      alert('Activate Run');
      return true;
    }
  }
}
