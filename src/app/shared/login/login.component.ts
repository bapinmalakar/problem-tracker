import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../services/userAuth.service';
import { ValidationService } from './../services/validation.service';

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
    password: ''
  };

  validation: any = false;
  errorText: any = {
    fname: '',
    lname: '',
    email: '',
    gender: '',
    password: ''
  };
  constructor(public _userAuthService: UserAuthService, public _validationService: ValidationService) { }

  ngOnInit() {
    this.validation = false;
  }

  register() {
    console.log('User Model: ', this.userModel);
    this._userAuthService.registerUser(this.userModel)
      .subscribe(result => console.log('Result is: ', result), err => console.log('Registration error: ', err));
  }

  selectGender(gen) {
    if (!this.validation) {
      if (this.userModel.firstName) {
        let val = this._validationService.nameValidation(this.userModel.name);
        if (val == 1)
          this.errorText.fname = "Invalid name";
        if (val == 2)
          this.errorText.fname = "Name Only Contain Alphabte, no any other symbol";
      } else
        this.errorText.fname = 'First name required';
    }
    this.validation = true;
    this.userModel.gender = gen.toUpperCase();
  }
}
