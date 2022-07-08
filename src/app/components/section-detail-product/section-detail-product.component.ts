import { Subscription } from 'rxjs';
import { Cart, CartService } from './../../core/services/cart.service';
import { Product } from './../../core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-section-detail-product',
  templateUrl: './section-detail-product.component.html',
  styleUrls: ['./section-detail-product.component.scss'],
})
export class SectionDetailProductComponent implements OnInit, OnDestroy {
  product: Product = null;
  promotionSelected = null;
  promotions = [{ discount: 500, expiryDate: '1/7/2020' }];
  cart: Cart;
  isOpenModelImage = false;
  displayImage;
  toast;
  isAlert = false;
  isError = false;
  productSub: Subscription;
  cartSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const slug = params['slug'];
      this.product = this.productService.productSeleted;
      this.cart = this.cartService.getCart(this.product._id);
      this.titleService.setTitle('PhongVu - ' + this.product.name);
      console.log(this.product);
      this.displayImage = {
        index: 0,
        gallery: this.product.image,
      };
    });
    this.productSub = this.productService.productSelectedChanged.subscribe(
      (product) => {
        this.product = product;
        this.titleService.setTitle('PhongVu - ' + product.name);
        this.cart = this.cartService.getCart(this.product._id);
      }
    );
    this.cartSub = this.cartService.cartsChanged.subscribe(
      (carts) => (this.cart = this.cartService.getCart(this.product._id))
    );
  }
  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.productSub.unsubscribe();
  }

  onApplyPromotion(index) {
    if (
      this.promotionSelected !== null &&
      this.promotionSelected.toString() === this.promotions[index].toString()
    )
      this.promotionSelected = null;
    else
      this.promotionSelected = {
        index: index,
        promotion: this.promotions[index],
      };
  }
  onOpenModelImage() {
    this.isOpenModelImage = true;
    document.body.style.overflow = 'hidden';
  }
  onCloseModelImage(event) {
    this.isOpenModelImage = event;
    document.body.style.overflow = 'unset';
  }
  onChangeDisplayImage(index) {
    this.displayImage = {
      index: index,
      gallery: this.product.galleries[index].url,
    };
    console.log(this.displayImage);
  }
  onAddToCart() {
    if (this.cart && this.product.quantity <= this.cart.quantity) {
      this.toast = {
        type: 'error',
        message: `Only ${this.product.quantity} products left`,
      };
      this.isError = true;
      this.isAlert = true;
      console.log(this.cart.quantity);
    } else {
      this.cartService.saveCart(this.product, 1);
      this.toast = {
        type: 'success',
        message: 'Product added to cart',
      };
      this.isError = false;
      this.isAlert = true;
    }
  }
}
