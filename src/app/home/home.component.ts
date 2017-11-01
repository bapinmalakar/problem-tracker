import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Inside home component');
  }

}
