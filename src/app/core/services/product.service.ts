import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface dataResponse {
  page: number;
  limit: number;
  totalRow: number;
  totalPage: number;
  data: Product[];
}
@Injectable({ providedIn: 'root' })
export class ProductService {
  products: Product[];
  productsChanged = new Subject<Product[]>();
  constructor(private http: HttpClient) {}
  fetchData() {
    let queryParams = new HttpParams().append('sort[createdAt]', 'asc');
    return this.http
      .get<dataResponse>(environment.urlApi + '/products', {
        params: queryParams,
      })
      .pipe(
        map((dataResponse) => {
          console.log(dataResponse);
          return dataResponse.data;
        }),
        tap((products) => this.setProducts(products))
      );
  }
  getProducts() {
    if (!this.products) return [];
    return this.products.slice();
  }

  setProducts(products: Product[]) {
    this.products = products.slice();
    this.productsChanged.next(products.slice());
  }
  getProductsByCategoryId(id: string): Product[] {
    if (!this.products) return [];
    return this.products.filter((product) => product.category._id === id);
  }
}
