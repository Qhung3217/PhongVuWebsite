import { ProductService } from 'src/app/core/services/product.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    const products = this.productService.getProducts();
    // console.log('resolve', products);
    if (products.length === 0) return this.productService.fetchData();
    return products;
  }
}
