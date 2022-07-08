import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

export interface Cart {
  item: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  carts: Cart[];
  cartsChanged = new Subject<Cart[]>();
  constructor() {
    if (localStorage.getItem('cart'))
      this.carts = JSON.parse(localStorage.getItem('cart'));
  }
  getCarts() {
    if (!this.carts) {
      if (localStorage.getItem('cart')) {
        this.carts = JSON.parse(localStorage.getItem('cart'));
        this.cartsChanged.next(this.carts);
        return this.carts.slice();
      }
      return [];
    }
    return this.carts.slice();
  }
  getCart(productId: string) {
    if (this.carts)
      return this.carts.find((cart) => cart.item._id === productId);
    return null;
  }
  getTotalQuantityInCarts() {
    if (!this.carts) {
      return 0;
    }
    return this.carts.reduce((total, cart) => (total += cart.quantity), 0);
  }
  saveCart(product: Product, quantity) {
    if (localStorage.getItem('cart')) {
      this.carts = [...JSON.parse(localStorage.getItem('cart'))];
      const itemExisted = this.carts.find(
        (cart) => cart.item._id === product._id
      );
      if (itemExisted) {
        const index = this.carts.findIndex(
          (cart) => cart.item._id === product._id
        );
        this.carts[index] = {
          item: product,
          quantity: itemExisted.quantity + quantity,
        };
      } else this.carts.push({ item: product, quantity: quantity });
    } else {
      if (!this.carts) this.carts = [{ item: product, quantity: quantity }];
      else this.carts.push({ item: product, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(this.carts));
    this.cartsChanged.next(this.carts);
  }
  clearCarts() {
    if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart');
      this.cartsChanged.next(null);
    }
  }
  removeCart(productID: string) {
    const cartIndex = this.carts.findIndex(
      (cart) => cart.item._id === productID
    );
    if (cartIndex !== -1) {
      this.carts.splice(cartIndex, 1);
      localStorage.setItem('cart', JSON.stringify(this.carts));
      this.cartsChanged.next(this.carts);
    }
  }
}
