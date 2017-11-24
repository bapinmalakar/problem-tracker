import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
@Injectable()
export class UserModelService extends User {
    public userModel: Subject<boolean> = new BehaviorSubject<boolean>(false);
    constructor() {
        super();
    }
    setUser(data) {
        this.user = data;
        this.userModel.next(true);
    }
    getUser() {
        return this.user;
    }
}
