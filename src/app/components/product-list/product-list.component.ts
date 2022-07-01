import { Product } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() title;
  @Input() categoryId;
  products: Product[] = [];
  currentPage = 1;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.assignProducts();
    this.productService.productsChanged.subscribe(() => this.assignProducts());
  }
  private assignProducts() {
    if (this.categoryId)
      this.products = this.productService.getProductsByCategoryId(
        this.categoryId
      );
    else this.products = this.productService.getProducts();
  }
}
