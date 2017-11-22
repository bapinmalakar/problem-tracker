import { environment } from './../../../environments/environment';
import { CookieService } from './../../shared/cookies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pt-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  userDetails: any;
  constructor(public _cookieService: CookieService) {
  }

  ngOnInit() {
  }

}
