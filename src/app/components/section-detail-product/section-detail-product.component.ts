import { Product } from './../../core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-detail-product',
  templateUrl: './section-detail-product.component.html',
  styleUrls: ['./section-detail-product.component.scss'],
})
export class SectionDetailProductComponent implements OnInit {
  product: Product = null;
  promotionSelected = null;
  promotions = [{ discount: 500, expiryDate: '1/7/2020' }];
  isOpenModelImage = false;
  displayImage;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const slug = params['slug'];
      // this.product = this.productService.getProductBySlug(slug);
      this.product = this.productService.productSeleted;
      console.log(this.product);
      this.displayImage = {
        index: 0,
        gallery: this.product.image,
      };
    });
    this.productService.productSelectedChanged.subscribe(
      (product) => (this.product = product)
    );
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
    let carts = [];
    if (localStorage.getItem('cart'))
      carts = [...JSON.parse(localStorage.getItem('cart'))];
    const itemExisted = carts.find(
      (cart) => cart.item._id === this.product._id
    );
    if (itemExisted) {
      const index = carts.findIndex(
        (cart) => cart.item._id === this.product._id
      );
      carts[index] = { item: this.product, quantity: itemExisted.quantity + 1 };
    } else carts.push({ item: this.product, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(carts));
  }
}
