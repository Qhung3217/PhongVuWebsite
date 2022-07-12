import { AuthService } from './../../core/services/auth.service';
import { Subscription, take } from 'rxjs';
import { Cart, CartService } from './../../core/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-cart',
  templateUrl: './section-cart.component.html',
  styleUrls: ['./section-cart.component.scss'],
})
export class SectionCartComponent implements OnInit, OnDestroy {
  carts: Cart[];
  cartSub: Subscription;
  totalPrice;

  auth;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    this.cartSub = this.cartService.cartsChanged.subscribe((carts) => {
      this.carts = carts;
      this.totalPrice = this.calcTotalPrice(carts);
    });
    this.totalPrice = this.calcTotalPrice(this.carts);
    this.authService.auth.pipe(take(1)).subscribe((auth) => {
      this.auth = auth;
    });
    console.log('auth', this.auth);
  }
  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
  private calcTotalPrice(carts) {
    if (carts)
      return carts.reduce(
        (total, cart) => (total += cart.item.price * cart.quantity),

        0
      );
    return 0;
  }

  onRemoveCarts() {
    this.cartService.clearCarts();
  }

  onCheckout() {
    // if (!this.auth) this.router.navigate(['/authenticate']);
    // else
    this.router.navigate(['/checkout']);
  }
}
