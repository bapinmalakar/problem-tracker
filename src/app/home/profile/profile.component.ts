import { UserAuthService } from './../../shared/services/userAuth.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { CookieService } from './../../shared/cookies.service';
import { Component, OnInit } from '@angular/core';
import { UserModelService } from '../../shared/services/user.service';
import filestack from 'filestack-js';
import { ValidationService } from '../../shared/services/validation.service';

declare var window: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  client: any;
  editEmail: any = false;
  emailValidation: any = false;
  loadingImg: any = false;
  userDetails: any;
  currentEmail: any = '';
  modelShow: any = false;
  pinError: any = '';
  activePin: any = '';
  updateData = {
    description: '',
    deserr: '',
    cityerr: '',
    city: '',
    state: '',
    stateerr: '',
    emailErr: ''
  };
  addressValidation: any = false;
  descriptiomValidation: any = false;
  constructor(public _cookieService: CookieService,
    public _userModelService: UserModelService,
    public _navigate: Router,
    public _userAuthService: UserAuthService,
    public _validation: ValidationService) {
  }

  ngOnInit() {
    this.client = filestack.init(environment.filestack_api);
    this.updateData.state = this._userModelService.getUser() ? this._userModelService.getUser().address.state : '';
    this.updateData.city = this._userModelService.getUser() ? this._userModelService.getUser().address.city : '';
    this.updateData.description = this._userModelService.getUser() ? this._userModelService.getUser().description : '';
    this._userModelService.userModel.subscribe(user => {
      if (user) {
        this.updateData.state = this._userModelService.getUser().address.state || '';
        this.updateData.city = this._userModelService.getUser().address.city || '';
        this.updateData.description = this._userModelService.getUser().description || '';
        this.currentEmail = this._userModelService.getUser().email;
      }
    });
  }

  uploadImage() {
    this.loadingImg = true;
    this.client.pick({
      maxFiles: 1,
      minFiles: 1,
      accept: 'image/*',
      fromSources: ['local_file_system', 'imagesearch', 'facebook', 'gmail', 'instagram', 'url', 'github', 'webcam', 'googledrive'],
      lang: 'en',
      hideWhenUploading: true,
      disableTransformer: false,
      rejectOnCancel: true
    })
      .then((res) => {
        const url = res.filesUploaded[0].url;
        this._userAuthService.uploadImage(this._userModelService.getUser()._id, { url: url })
          .subscribe(result => {
            this._userModelService.getUser().profile_image = url;
            this.loadingImg = false;
          }, err => {
            console.log('Image upload error: ', err);
            window.errorToast('Some system error occure! Try again');
            this.loadingImg = false;
          });
      }, err => {
        window.errorToast('Some system error occure! Try again');
        this.loadingImg = false;
      });
  }
  saveAddress() {
    if (!this.addressValidation) {
      if (this.updateData.city && !this._validation.validAlphaSpace(this.updateData.city)) {
        this.updateData.cityerr = 'Invalid city name';
      } else {
        this.updateData.cityerr = '';
      }
      if (this.updateData.state && !this._validation.validAlphaSpace(this.updateData.state)) {
        this.updateData.stateerr = 'Invalid state name';
      } else {
        this.updateData.stateerr = '';
      }
      this.addressValidation = true;
    }
    if (!this.updateData.stateerr && !this.updateData.cityerr && (this.updateData.city || this.updateData.state)) {
      this._userAuthService.updateAddress(this._userModelService.getUser()._id,
        { city: this.updateData.city.trim().toLowerCase(), state: this.updateData.state.trim().toLowerCase(), area: '' })
        .subscribe(result => {
          console.log('Result: ', result);
          this._userModelService.getUser().address = result.address;
        }, err => {
          console.log('Error: ', err);
          window.errorToast('Some error occured! Try again');
        });
      this.addressValidation = false;
    } else if (!this.updateData.city && !this.updateData.state) {
      this.addressValidation = false;
    }
  }
  checkStateAndCityAndDescription(type: any) {
    if (type == 'state' && this.addressValidation) {
      if (this.updateData.state && !this._validation.validAlphaSpace(this.updateData.state)) {
        this.updateData.stateerr = 'Invalid state name';
      } else {
        this.updateData.stateerr = '';
      }
    } else if (type == 'city' && this.addressValidation) {
      if (this.updateData.city && !this._validation.validAlphaSpace(this.updateData.city)) {
        this.updateData.cityerr = 'Invalid city name';
      } else {
        this.updateData.cityerr = '';
      }
    } else if (type == 'description' && this.descriptiomValidation) {
      console.log('des');
      if (this.updateData.description && this.updateData.description.length < 100) {
        this.updateData.deserr = 'Description should have atleast 100 character';
      } else {
        this.updateData.deserr = '';
      }
    }
  }

  descriptionUpdate() {
    if (!this.descriptiomValidation) {
      if (this.updateData.description && this.updateData.description.length < 100) {
        this.updateData.deserr = 'Description should have atleast 100 character';
      } else {
        this.updateData.deserr = '';
      }
      this.descriptiomValidation = true;
    }
    if (!this.updateData.deserr && this.updateData.description
      && (this._userModelService.getUser().description != this.updateData.description.trim().toLowerCase())) {
      this._userAuthService.updateDescription(this._userModelService.getUser()._id, { description: this.updateData.description })
        .subscribe(result => {
          console.log('description Update result: ', result);
          this._userModelService.getUser().description = this.updateData.description.trim().toLowerCase();
        }, err => {
          console.log('Description update error: ', err);
          window.errorToast('Some error occured! Try again');
        });
      this.descriptiomValidation = false;
    }
  }
  cancle(type: any) {
    if (type == 'des') {
      this.descriptiomValidation = false;
      this.updateData.description = this._userModelService.getUser().description;
    } else if (type == 'address') {
      this.addressValidation = false;
      this.updateData.city = this._userModelService.getUser().address.city;
      this.updateData.state = this._userModelService.getUser().address.state;
    }
  }
  cancelEmailUpdate() {
    this._userModelService.getUser().email = this.currentEmail;
    this.updateData.emailErr = '';
    this.emailValidation = false;
    this.editEmail = false;
  }
  verifyEmail() {
    if (!this.emailValidation) {
      if (!this._userModelService.getUser().email) {
        this.updateData.emailErr = 'Kindly type email address';
      } else if (!this._validation.emailValidation(this._userModelService.getUser().email)) {
        this.updateData.emailErr = 'Kindly enter valid email address';
      }
      this.emailValidation = true;
    }
    if (this._userModelService.getUser().email.trim().toLowerCase() != this.currentEmail) {
      this.emailValidation = false;
      this._userAuthService.emailVerify(this._userModelService.getUser()._id, this._userModelService.getUser().email)
        .subscribe(result => {
          console.log('Result: ', result);
          this.modelShow = true;
        }, err => {
          console.log('Error: ', err);
          window.errorToast('Some error occured! Try again');
        });
    }
  }

  resendCode() {
    this.verifyEmail();
  }
  closeModal() {
    this.modelShow = false;
    this.activePin = '';
  }
  verifyCode() {
    if (!this.activePin) {
      this.pinError = 'Kindly enter 6-digit pin';
    } else if (this.activePin.length != 6) {
      this.pinError = 'Kindly enter valid pin';
    } else {
      this.pinError = '';
      this._userAuthService.emailUpdate(this._userModelService.getUser()._id, this._userModelService.getUser().email, this.activePin)
        .subscribe(result => {
          this.activePin = '';
          this.pinError = '';
          this.modelShow = false;
          this.currentEmail = this._userModelService.getUser().email.trim().toLowerCase();
          this._userModelService.getUser().email = this._userModelService.getUser().email.trim().toLowerCase();
          this.editEmail = false;
          this._cookieService.setCookie(environment.userCookie, result, 2);
        }, err => {
          console.log('EEEEE: ', err);
          if (err.error.code == 'E_PIN_MISMATCH_ERROR') {
            this.pinError = 'Pin not match';
          } else {
            window.errorToast('Some error occured! Try again');
          }
        });
    }
  }
}
