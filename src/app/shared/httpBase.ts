import { CookieService } from './cookies.service';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';
import { ServiceObserable } from './services/serviceObserable.service';
export class HttpBase {
    protected _url: any;
    protected _basicheader: any;
    protected option: any;
    private accessToken: any = '';
    private refreshToken: any = '';
    public _cookieService: any;
    public _cookieUpdate: any;
    constructor(_cookieSer: CookieService, _cookieUpdate: ServiceObserable) {
        this._cookieService = _cookieSer;
        this._cookieUpdate = _cookieUpdate;
        this._url = environment.url;
        this.retriveToken(); // First time initialze token from cookie
        this._basicheader = new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Basic ' + btoa(environment.app_secret_id + ':' + environment.app_secret_key)
        });
        this._cookieUpdate.cookieUpdate.subscribe(flag => {
            if (flag) {
                console.log('Run subscribe');
                this.retriveToken();
            }
        });
    }
    getPostOption(token = false) {
        if (!token) {
            this.option = new RequestOptions({ headers: this._basicheader, method: 'post' });
            return this.option;
        } else {
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
            const header = new Headers({
                'Content-Type': 'application/json',
                'auth_header': 'User ' + this.accessToken
            });
            const option = new RequestOptions({ headers: header, method: 'get' });
            return option;
        }
    }
    getPutOptions(token = false) {
        if (!token) {
            this.option = new RequestOptions({ headers: this._basicheader, method: 'put' });
            return this.option;
        } else {
            const header = new Headers({
                'Content-Type': 'application/json',
                'auth_header': 'User ' + this.accessToken
            });
            const option = new RequestOptions({ headers: header, method: 'put' });
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
    retriveToken() {
        console.log('Run');
        const tokens = this._cookieService.getCookie(environment.userCookie);
        if (tokens) {
            this.accessToken = JSON.parse(tokens).access_token;
            this.refreshToken = JSON.parse(tokens).refresh_token;
        }
    }
}
