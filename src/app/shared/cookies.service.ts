import { Injectable } from '@angular/core';
declare var document: any;

@Injectable()
export class CookieService {
    constructor() { }
    getCookie(name: any) {
        if (name) {
            const cookieName = name + '=';
            const cookieValue = document.cookie.split(';');
            for (let i = 0; i < cookieValue.length; i++) {
                let c = cookieValue[i];
                while (c.charAt(0) == '') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(cookieName) == 0) {
                    return JSON.parse(c.substring(cookieName.length, c.length));
                }
            }
            return null;
        }
    }
    setCookie(naem: any, value: any, expire: any = '') {
        let expires = '';
        if (expire) {
            let date = new Date();
            date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
            expires = '; expires: ' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }
}
