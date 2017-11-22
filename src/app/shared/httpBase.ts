import { CookieService } from './cookies.service';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';
export class HttpBase {
    protected _url: any;
    protected _basicheader: any;
    protected option: any;
    private accessToken: any = '';
    private refreshToken: any = '';
    public _cookieService: any;
    constructor(_cookieSer: CookieService) {
        this._cookieService = _cookieSer;
        this._url = environment.url;
        this._basicheader = new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(environment.app_secret_id + ':' + environment.app_secret_key)
        });
    }
    getPostOption(token = false) {
        if (!token) {
            this.option = new RequestOptions({ headers: this._basicheader, method: 'post' });
            return this.option;
        } else {
            if (!this.accessToken) {
                this.retriveAccessToken();
            }
            const header = new Headers({
                'Content-Type': 'application/json',
                'auth_header': 'User ' + this.accessToken
            });
            const option = new RequestOptions({ headers: header, method: 'post' });
            return option;
        }
    }
    getGetOption(token = false) {
        if (!token) {
            this.option = new RequestOptions({ headers: this._basicheader, method: 'get' });
            return this.option;
        } else {
            if (!this.accessToken) {
                this.retriveAccessToken();
            }
            const header = new Headers({
                'Content-Type': 'application/json',
                'auth_header': 'User ' + this.accessToken
            });
            const option = new RequestOptions({ headers: header, method: 'get' });
            return option;
        }
    }
    extractData(res: Response) {
        const body = res.json();
        return body.data || {};
    }
    handelError(err: Response) {
        const error = err.json();
        return Observable.throw(error);
    }

    retriveAccessToken() {
        this.accessToken = this._cookieService.getCookie(environment.userCookie);
        if (this.accessToken) {
            this.accessToken = JSON.parse(this.accessToken).access_token;
        }
    }
}
