import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'phongvu';
  constructor() {}
  isLoading = false;
  ngOnInit() {}
  onActivate(event) {
    this.isLoading = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
