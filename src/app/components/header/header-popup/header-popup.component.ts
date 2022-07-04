import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-popup',
  templateUrl: './header-popup.component.html',
  styleUrls: ['./header-popup.component.scss'],
})
export class HeaderPopupComponent implements OnInit {
  @Input() isNotification: boolean = false;
  carts;
  notifyImg = 'https://shopfront-cdn.tekoapis.com/static/e536f0592aa3c8b1.png';
  cartImg = 'https://i.imgur.com/Drj57qu.png';
  constructor() {
    if (localStorage.getItem('cart'))
      this.carts = JSON.parse(localStorage.getItem('cart'));
  }

  ngOnInit(): void {}
}
