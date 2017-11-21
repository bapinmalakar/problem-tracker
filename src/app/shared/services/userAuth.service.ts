import { Injectable } from '@angular/core';
import { HttpBase } from './../httpBase';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
@Injectable()
export class UserAuthService extends HttpBase {
    constructor(public _http: Http) {
        super();
    }
    registerUser(data) {
        return this._http.post(this._url + environment.version + '/user/sign', data, this.getPostOption())
            .map(this.extractData)
            .catch(this.handelError) ;
    }
    resendCode(id) {
        return this._http.get(this._url + environment.version + '/user/' + id + '/resend_code', this.getGetOption())
            .map(this.extractData)
            .catch(this.handelError);
    }
    verifyCode(id, pin) {
        return this._http.post(this._url + environment.version + '/user/' + id + '/activate-account', { pin }, this.getPostOption())
            .map(this.extractData)
            .catch(this.handelError);
    }
    laterActivatePin(id) {
        return this._http.get(this._url + environment.version + '/user/' + id + '/get_code_active', this.getGetOption())
            .map(this.extractData)
            .catch(this.handelError);
    }
    userLogin(obj) {
        return this._http.post(this._url + environment.version + '/user/login', obj, this.getPostOption())
            .map(this.extractData)
            .catch(this.handelError);
    }
}
