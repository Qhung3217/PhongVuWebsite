import { AuthService } from './../../core/services/auth.service';
import { Product } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
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
  isLoading = false;
  countChecked;
  checkInputArray;
  auth;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    this.countChecked = this.carts.length;
    this.checkInputArray = Array(this.carts.length).fill(true);
    this.cartSub = this.cartService.cartsChanged.subscribe((carts) => {
      this.carts = carts;
      this.totalPrice = this.calcTotalPrice(carts);
      this.countChecked = this.carts.length;
      this.checkInputArray = Array(this.carts.length).fill(true);
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
      return carts.reduce((total, cart, index) => {
        // console.log('checkinput ', this.checkInputArray[index]);
        if (this.checkInputArray[index]) {
          return (total += cart.item.price * cart.quantity);
        }
        return total;
      }, 0);
    return 0;
  }
  onChangeChecked(event, i) {
    console.log(event);
    if (event.target.checked) {
      if (this.countChecked < this.carts.length) this.countChecked++;
    } else {
      if (this.countChecked > 0) this.countChecked--;
    }
    this.checkInputArray[i] = event.target.checked;
    this.totalPrice = this.calcTotalPrice(this.carts);
  }
  onChangeCheckedMaster(event) {
    if (event.target.checked) {
      this.countChecked = this.carts.length;
    } else {
      this.countChecked = 0;
    }
    this.checkInputArray = Array(this.carts.length).fill(event.target.checked);
    this.totalPrice = this.calcTotalPrice(this.carts);
  }
  onRemoveCarts() {
    this.cartService.clearCarts();
  }
  onRemoveCart(productId) {
    this.cartService.removeCart(productId);
  }
  onCheckout() {
    if (!this.auth) this.router.navigate(['/authenticate']);
    else this.router.navigate(['/checkout']);
  }
  async onIncreaseQuantity(slug: string) {
    this.isLoading = true;
    const cart = this.carts.find((cart) => cart.item.slug === slug);
    if (cart) {
      const product = await this.productService.getProductBySlug(slug);
      console.log('in increase: ', product);
      this.changeQuantity(true, product, cart);
    }
  }
  async onDecreaseQuantity(slug: string) {
    this.isLoading = true;
    const cart = this.carts.find((cart) => cart.item.slug === slug);
    if (cart) {
      const product = await this.productService.getProductBySlug(slug);
      console.log('in increase: ', product);
      this.changeQuantity(false, product, cart);
    }
  }

  private changeQuantity(isIncrease = false, product: Product, cart: Cart) {
    if (
      product &&
      (product.quantity <= 1 ||
        product.quantity <= cart.quantity ||
        cart.quantity > product.quantity)
    ) {
      this.cartService.saveCart(product, product.quantity);
      console.log(product.quantity);
    } else {
      if (isIncrease) this.cartService.saveCart(cart.item, 1);
      else this.cartService.saveCart(cart.item, -1);
      // console.log(cart.quantity - 1);
    }
    this.isLoading = false;
  }
}
