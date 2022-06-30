import { Product } from './../../../core/models/product.model';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss'],
})
export class DealListComponent implements OnInit, OnDestroy {
  products: Product[];
  productSub: Subscription;
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    autoplayspeed: 10000,
    accessibility: false,
    draggable: false,
    infinite: false,
  };
  _trackBy(product) {
    return product.image;
  }
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    if (this.products.length === 0)
      this.productService
        .fetchData()
        .subscribe((products) => (this.products = products));
    this.productSub = this.productService.productsChanged.subscribe(
      (products) => (this.products = products)
    );
  }
  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
