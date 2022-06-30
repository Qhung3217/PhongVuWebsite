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
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.productsChanged.subscribe(
      (products) => (this.products = products)
    );
  }
}
