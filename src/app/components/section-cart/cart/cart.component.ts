import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { Cart, CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() cart;
  carts;
  isLoading;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
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
