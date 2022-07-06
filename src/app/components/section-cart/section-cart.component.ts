import { Product } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { Subscription } from 'rxjs';
import { Cart, CartService } from './../../core/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    this.cartSub = this.cartService.cartsChanged.subscribe((carts) => {
      this.carts = carts;
      this.totalPrice = this.calcTotalPrice(carts);
    });
    this.totalPrice = this.calcTotalPrice(this.carts);
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
  onRemoveCart(productId) {
    this.cartService.removeCart(productId);
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
