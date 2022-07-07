import { Subscription } from 'rxjs';
import { Product } from './../../core/models/product.model';
import {
  dataResponse,
  ProductService,
} from './../../core/services/product.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() categoryId;
  products: Product[] = [];
  currentPage = 1;
  totalRow;
  pageSize;
  id = Math.random().toString();
  productSub: Subscription;
  isLoading = false;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.assignProducts();
    this.productSub = this.productService.productsChanged.subscribe(() =>
      this.assignProducts()
    );
  }
  private assignProducts() {
    if (this.categoryId)
      this.productService
        .getProductsByCategoryId(this.categoryId)
        .subscribe((dataResponse: dataResponse) => {
          this.products = dataResponse.data as Product[];
          this.pageSize = dataResponse.limit;
          this.totalRow = dataResponse.totalRow;
          this.isLoading = false;
        });
    else {
      this.products = this.productService.getProducts();
      if (this.productService.dataResponse) {
        this.pageSize = this.productService.dataResponse.limit;
        this.totalRow = this.productService.dataResponse.totalRow;
      }
    }
    this.isLoading = false;
    // console.log('dataREs: ', this.productService.dataResponse);
  }
  handlePageChange(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    this.productService
      .fetchDataPerPage(page)
      .subscribe((products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      });
  }
  ngOnDestroy() {
    if (this.productSub) this.productSub.unsubscribe();
  }
}
