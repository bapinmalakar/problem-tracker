import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';
export class HttpBase {
    protected _url: any;
    protected _basicheader: any;
    protected _authHeader: any;
    protected option: any;
    constructor() {
        this._url = environment.url;
    }
    getPostOption() {
        return 'post option';
    }
    getGetOption() {
        return 'get option';
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