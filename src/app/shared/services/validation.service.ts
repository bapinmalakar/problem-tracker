import { Injectable } from '@angular/core';
@Injectable()
export class ValidationService {
    name = /^[a-zA-Z]*$/;
    mobile = /^[7-9][0-9]{9}$/;
    emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor() { }
    nameValidation(name) {
        if (name.length <= 1)
            return 1;
        if (!this.name.test(name))
            return 2;
        return 3;
    }
    emailValidation(email) {
        return this.emailExp.test(email);
    }
    passwordValidation(password) {
        if (password.length < 6)
            return 1;
        else
            return 3;
    }
    validAlphaSpace(data) {
        return /^[a-zA-Z ]*$/.test(data);
    }
}
