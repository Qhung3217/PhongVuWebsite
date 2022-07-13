import { Subscription } from 'rxjs';
import { CartService } from './../../../core/services/cart.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header-popup',
  templateUrl: './header-popup.component.html',
  styleUrls: ['./header-popup.component.scss'],
})
export class HeaderPopupComponent implements OnInit, OnDestroy {
  @Input() isNotification: boolean = false;
  carts;
  notifies;
  notifyImg = 'https://shopfront-cdn.tekoapis.com/static/e536f0592aa3c8b1.png';
  cartImg = 'https://i.imgur.com/Drj57qu.png';
  totalPrice;
  cartSub: Subscription;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    this.totalPrice = this.carts.reduce(
      (total, cart) => (total += cart.item.price * cart.quantity),
      0
    );
    this.cartSub = this.cartService.cartsChanged.subscribe((carts) => {
      this.carts = carts;
      if (this.carts)
        this.totalPrice = this.carts.reduce(
          (total, cart) => (total += cart.item.price * cart.quantity),
          0
        );
      else this.totalPrice = 0;
    });
  }
  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
