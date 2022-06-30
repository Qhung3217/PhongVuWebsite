import { Product } from './../../../core/models/product.model';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss'],
})
export class DealListComponent implements OnInit, OnDestroy {
  @Input() categoryID;
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
    this.assignProducts();
    if (this.products.length === 0)
      this.productService.fetchData().subscribe(() => this.assignProducts());
    this.productSub = this.productService.productsChanged.subscribe(() =>
      this.assignProducts()
    );
  }
  private assignProducts() {
    if (this.categoryID)
      this.products = this.productService.getProductsByCategoryId(
        this.categoryID
      );
    else this.products = this.productService.getProducts();
  }
  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
