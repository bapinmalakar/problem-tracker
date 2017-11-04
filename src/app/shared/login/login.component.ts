import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../services/userAuth.service';
import { ValidationService } from './../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userModel: any = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    cpassword: ''
  };
  signupText: any = 'Register';
  resendText: any = 'Resend';
  verifyText: any = 'Verify';
  validation: any = false;
  modelShow: any = false;
  activePin = '';
  pinError = '';
  userId: any = '';
  laterModelShow = false;
  laterEmail = '';
  emailError = '';
  laterSendText = 'Send Pin';
  errorText: any = {
    fname: '',
    lname: '',
    email: '',
    gender: '',
    password: '',
    cpassword: ''
  };
  constructor(public _userAuthService: UserAuthService, public _validationService: ValidationService,
    public navigate: Router) { }

  ngOnInit() {
    this.initValue();
    this.refreshAcivateModel();
  }

  register() {
    this.signupText = 'Proccessing...';
    console.log('User Model: ', this.userModel);
    if (!this.validation) {
      console.log('Inside');
      this.firstnameValidation();
      this.lastnameValidation();
      this.emailaddVlidation();
      this.passwordValidation();
      this.cpasswordValidation();
      this.genderValidation();
      this.validation = true;
    }
    let flag = false;
    for (let attr in this.errorText) {
      if (this.errorText[attr] != '') {
        flag = true;
        break;
      }
    }
    if (!flag) {
      let self = this;
      this._userAuthService.registerUser(this.userModel)
        .subscribe(result => {
          console.log('Result is: ', result);
          self.userId = result._id;
          self.signupText = 'Register';
          self.modelShow = true;
          self.refreshAcivateModel();
        },
        err => {
          //console.log('Registration error: ', err);
          self.signupText = 'Register';
          if (err.error.code == 'E_DUPLICACY_ERROR') {
            self.errorText.email = err.error.message;
          }
        });
    } else {
      this.signupText = 'Register';
    }
  }

  validationFun(field) {
    if (this.validation) {
      switch (field) {
        case 'fname': this.firstnameValidation();
          break;
        case 'lname': this.lastnameValidation();
          break;
        case 'email': this.emailaddVlidation();
          break;
        case 'password': this.passwordValidation();
          break;
        case 'cpassword': this.cpasswordValidation();
          break;
        default: console.log('Nothing case');
          break;
      }
    }
  }
  selectGender(gen) {
    this.userModel.gender = gen.toUpperCase();
    if (this.validation && this.userModel.gender) {
      this.errorText.gender = '';
    } else if (this.validation && this.userModel.gender === '') {
      this.errorText.gender = 'Please select gender';
    }
  }
  firstnameValidation() {
    if (this.userModel.firstName.trim()) {
      const val = this._validationService.nameValidation(this.userModel.firstName);
      if (val === 1) {
        this.errorText.fname = 'Invalid name';
      }
      if (val === 2) {
        this.errorText.fname = 'Name Only Contain Alphabte, no any other symbol';
      }
      if (val === 3) {
        this.errorText.fname = '';
      }
    } else {
      this.errorText.fname = 'Firstname required';
    }
  }
  lastnameValidation() {
    if (this.userModel.lastName.trim()) {
      const val = this._validationService.nameValidation(this.userModel.lastName);
      if (val === 1) {
        this.errorText.lname = 'Invalid last name';
        return false;
      }
      if (val === 2) {
        this.errorText.lname = 'Name Only Contain Alphabte, no any other symbol';
        return false;
      }
      if (val === 3) {
        this.errorText.lname = '';
        return true;
      }
    } else {
      this.errorText.lname = '';
    }

  }
  emailaddVlidation() {
    if (this.userModel.email.trim()) {
      if (this._validationService.emailValidation(this.userModel.email)) {
        this.errorText.email = '';
      } else {
        this.errorText.email = 'Invalid email';
      }
    } else {
      this.errorText.email = 'Email required';
    }

  }
  passwordValidation() {
    if (this.userModel.password) {
      const val = this._validationService.passwordValidation(this.userModel.password);
      if (val === 1) {
        this.errorText.password = 'Password shoul be 6 character long or more';
      } else {
        this.errorText.password = '';
      }
    } else {
      this.errorText.password = 'Password required';
    }

  }
  cpasswordValidation() {
    if (this.userModel.cpassword) {
      if (this.userModel.cpassword === this.userModel.password) {
        this.errorText.cpassword = '';
      } else {
        this.errorText.cpassword = 'Password not match';
      }
    } else if (this.userModel.password && !this.userModel.cpassword) {
      this.errorText.cpassword = 'Please retype password';
    } else {
      this.errorText.cpassword = '';
    }
  }
  genderValidation() {
    if (this.userModel.gender) {
      this.errorText.gender = '';
    } else {
      this.errorText.gender = 'Please select gender';
    }
  }
  closeModal(val) {
    if (val == 'V') {
      this.modelShow = false;
    } else if (val == 'L') {
      this.laterModelShow = false;
    }
  }
  resendCode() {
    this.resendText = 'Sending...';
    const self = this;
    this._userAuthService.resendCode(this.userId)
      .subscribe(result => {
        console.log('Resend result: ', result);
        self.resendText = 'Resend';
      }, err => {
        console.log('Resend error: ', err);
        self.resendText = 'Resend';
      });
  }
  verifyCode() {
    this.verifyText = 'Verifying...';
    if (!this.activePin) {
      this.pinError = 'Enter 6-digit activation pin!';
      this.verifyText = 'Verify';
    } else if (this.activePin.length != 6) {
      this.pinError = 'Invalid activation pin';
      this.verifyText = 'Verify';
    } else {
      this.pinError = '';
      let self = this;
      this._userAuthService.verifyCode(this.userId, this.activePin)
        .subscribe(result => {
          console.log('Result is: ', result);
          self.verifyText = 'Verify';
          self.modelShow = false;
          localStorage.setItem('problemTrackerDetails', JSON.stringify(result));
          self.navigate.navigate(['home']);
        }, err => {
          console.log('Verify error: ', err);
          self.verifyText = 'Verify';
          if (err.error.code === 'E_PIN_MISMATCH_ERROR') {
            self.pinError = err.error.message;
          } else {
            self.pinError = 'Server error try again!';
          }
        });
    }
  }

  refreshAcivateModel() {
    this.activePin = '';
    this.verifyText = 'Verify';
    this.resendText = 'Resend';
    this.pinError = '';
  }
  laterModel() {
    this.laterEmail = '';
    this.emailError = '';
    this.laterSendText = 'Send Pin';
    this.laterModelShow = true;
  }
  initValue() {
    this.validation = false;
    this.modelShow = false;
    this.userId = '';
    this.laterModelShow = false;
    this.laterEmail = '';
    this.emailError = '';
    this.laterSendText = 'Send Pin';
  }
  sendActivatePin() {
    if (!this.laterEmail) {
      this.emailError = 'Enter register email';
    } else if (this._validationService.emailValidation(this.laterEmail)) {
      this.laterSendText = 'Processing...';
      this.emailError = '';
      let self = this;
      this._userAuthService.laterActivatePin(this.laterEmail)
        .subscribe(result => {
          console.log('Result is: ', result);
          self.laterSendText = 'Send Pin';
          self.laterModelShow = false;
          self.modelShow = true;
          self.userId = result._id;
          self.refreshAcivateModel();
        }, err => {
          console.log('Error: ', err);
          if (err.error.code === 'E_USER_NOT_FOUND_ERROR') {
            self.emailError = 'This email not valid!';
          }
          self.laterSendText = 'Send Pin';
        });
    } else {
      this.emailError = 'Enter valid email please';
    }
  }
}
