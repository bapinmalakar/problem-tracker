import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class UserService implements CanActivate {

  constructor(private _navigate: Router) { }
  canActivate() {
    if (!localStorage.getItem('problemTracker')) {
      alert('Not Found');
      this._navigate.navigate(['/errorpage']);
      return false;
    } else {
      alert('Activate Run');
      return true;
    }
  }
}
