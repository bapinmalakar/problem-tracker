import { ServiceObserable } from './../../../../shared/services/serviceObserable.service';
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
  daysLeft: any;
  modelShow: any = false;
  pinError: any = '';
  activePin: any = '';
  verifyText: any = 'Verify';
  resendText: any = 'Resend Code';
  constructor(public _userModelService: UserModelService,
    public _cookieService: CookieService,
    private _userAuthService: UserAuthService,
    private _cookieSet: ServiceObserable,
    private _navigate: Router) { }

  ngOnInit() {
    this._userModelService.userModel.subscribe(flg => {
      if (flg) {
        const oneDay = 24 * 60 * 60 * 1000;
        const dayDiff = Math.round(Math.abs(((new Date(this._userModelService.getUser().createdAt).getTime()) -
          (new Date().getTime())) / oneDay));
        console.log('Days is : ', dayDiff);
        this.daysLeft = 30 - dayDiff;
        console.log('userrrrr=> ', this._userModelService.getUser());
      }
    });
  }
  logout() {
    this._cookieService.setCookie(environment.userCookie, '', -1);
    this._userAuthService.logout(this._userModelService.getUser()._id)
      .subscribe(result => {
        console.log('Logout result: ', result);
        this._navigate.navigate(['/']);
      }, err => {
        console.log('Error: ', err);
      });
  }

  verifyAccountModal() {
    this._userAuthService.resendCode(this._userModelService.getUser()._id)
      .subscribe(result => this.modelShow = true, err => {
        console.log('Send code error: ', err);
        alert('Send code error');
      });
  }
  closeModal() {
    this.activePin = '';
    this.pinError = '';
    this.modelShow = false;
  }
  verifyCode() {
    if (!this.activePin) {
      this.pinError = 'Activation pin required';
      return false;
    } else if (this.activePin.length != 6) {
      this.pinError = 'Invalid activation pin';
      return false;
    } else {
      this.verifyText = 'Processing.....';
      this.pinError = '';
      this._userAuthService.verifyCode(this._userModelService.getUser()._id, this.activePin)
        .subscribe(result => {
          this.verifyText = 'Verify';
          console.log('Pin activate result: ', result);
          this._cookieSet.setCookie(environment.userCookie, result, 2);
          this._userModelService.getUser().active = true;
          this.closeModal();
        }, err => {
          this.verifyText = 'Verify';
          if (err.error.code === 'E_PIN_MISMATCH_ERROR') {
            this.pinError = err.error.message;
          } else {
            this.pinError = 'Server error try again!';
          }
        });
    }
  }

  resendCode() {
    this.resendText = 'Sending.....';
    this._userAuthService.resendCode(this._userModelService.getUser()._id)
      .subscribe(result => this.resendText = 'Resend', err => {
        console.log('Resend error: ', err);
        this.resendText = 'Resend';
      });
  }
}
