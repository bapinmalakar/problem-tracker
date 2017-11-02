import { Injectable } from '@angular/core';
import { User } from '../models/user';
@Injectable()
export class UserModelService extends User {
    constructor() {
        super();
    }
    setUser(data) {
        this.user = data;
    }
    getUser() {
        return this.user;
    }
}
