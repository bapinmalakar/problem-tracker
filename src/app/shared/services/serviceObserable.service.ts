import { Injectable } from '@angular/core';
import { CookieService } from '../cookies.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ServiceObserable {
    public cookieUpdate: Subject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(public _cookieService: CookieService) { }
    setCookie(name, value, hour): any {
        this._cookieService.setCookie(name, value, hour);
        this.cookieUpdate.next(true);
    }
}
