import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';
export class HttpBase {
    protected _url: any;
    protected _basicheader: any;
    protected option: any;
    constructor() {
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
        }
    }
    getGetOption(token = false) {
        if (!token) {
            this.option = new RequestOptions({ headers: this._basicheader, method: 'get' });
            return this.option;
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
}
