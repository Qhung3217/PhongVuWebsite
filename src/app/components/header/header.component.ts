import { Subscription } from 'rxjs';
import { CartService } from './../../core/services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  countCarts;
  cartSub: Subscription;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.countCarts = this.cartService.getTotalQuantityInCarts();

    // this.counterQuantity();
    this.cartSub = this.cartService.cartsChanged.subscribe(
      (carts) => (this.countCarts = this.cartService.getTotalQuantityInCarts())
    );
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  /* no change countCarts ?
  counterQuantity(carts = null) {
    // console.log(this.cartService.getCarts());
    // if (!this.cartService.getCarts()) return 0;
    if (!carts) {
      console.log('cart null');
      this.countCarts = this.cartService
        .getCarts()
        .reduce((total, cart) => (total += cart.quantity), 0);
    } else {
      this.countCarts = carts.reduce(
        (total, cart) => (total += cart.quantity),
        0
      );
      console.log('cart not null', this.countCarts);
    }
  }*/
}
