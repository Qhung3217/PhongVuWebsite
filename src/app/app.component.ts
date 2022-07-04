import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'phongvu';
  constructor() {}
  ngOnInit() {}
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
