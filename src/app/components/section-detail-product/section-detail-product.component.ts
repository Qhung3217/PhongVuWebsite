import { Subscription } from 'rxjs';
import { Cart, CartService } from './../../core/services/cart.service';
import { Product } from './../../core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-section-detail-product',
  templateUrl: './section-detail-product.component.html',
  styleUrls: ['./scss/section-detail-product.component.scss'],
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
    private titleService: Title,
    private router: Router
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
  onBuyNow() {
    this.processAddToCart(true);
  }
  onAddToCart() {
    this.processAddToCart();
  }
  processAddToCart(isBuyNow = false) {
    if (this.cart && this.product.quantity <= this.cart.quantity) {
      this.alertMessage('error', `Only ${this.product.quantity} products left`);
      console.log(this.cart.quantity);
    } else {
      this.cartService.saveCart(this.product, 1);
      if (isBuyNow) {
        this.router.navigate(['/account/checkout']);
      } else this.alertMessage('success', 'Product added to cart');
    }
  }
  alertMessage(type: string, message: string) {
    if (type === 'error') {
      this.toast = {
        type: 'error',
        message: message,
      };
      this.isError = true;
      this.isAlert = true;
    } else {
      this.toast = {
        type: 'success',
        message: message,
      };
      this.isError = false;
      this.isAlert = true;
    }
  }
}
