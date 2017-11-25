import { environment } from './../../../environments/environment';
import { CookieService } from './../cookies.service';
import { Injectable } from '@angular/core';
import { HttpBase } from './../httpBase';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ServiceObserable } from './serviceObserable.service';
@Injectable()
export class UserAuthService extends HttpBase {
    constructor(public _http: Http, public _cookieService: CookieService, _cookieUpdate: ServiceObserable) {
        super(_cookieService, _cookieUpdate);
    }
    registerUser(data) {
        return this._http.post(this._url + environment.version + '/user/sign', data, this.getPostOption())
            .map(this.extractData)
            .catch(this.handelError);
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
    getUser(id) {
        return this._http.get(this._url + environment.version + '/user/' + id + '/get_details', this.getGetOption(true))
            .map(this.extractData)
            .catch(this.handelError);
    }
    logout(id) {
        return this._http.get(this._url + environment.version + '/user/' + id + '/log_out')
            .map(this.extractData)
            .catch(this.handelError);
    }
    uploadImage(id, data) {
        return this._http.put(this._url + environment.version + '/user/' + id + '/update_image', data, this.getPutOptions(true))
            .map(this.extractData)
            .catch(this.handelError);
    }
}
