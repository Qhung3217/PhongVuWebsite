import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('PhongVu - Checkout');
  }

  ngOnInit(): void {}
}
