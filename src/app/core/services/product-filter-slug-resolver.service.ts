import { LoadingSpinnerService } from './loading-spinner.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductFilterSlugResolver implements Resolve<Product[] | Product> {
  constructor(
    private productService: ProductService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Product
    | Product[]
    | Observable<Product[] | Product>
    | Promise<Product[] | Product> {
    console.log('resolver', route.params, state);

    return this.productService
      .getProductDetailBySlug(route.params['slug'])
      .pipe(tap(() => this.loadingSpinnerService.turnOn())) as Observable<
      Product[] | Product
    >;
    // return null;
  }
}
