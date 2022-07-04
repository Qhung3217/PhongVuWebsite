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
export class ProductFilterSlugResolver implements Resolve<Product[] | Product> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Product
    | Product[]
    | Observable<Product[] | Product>
    | Promise<Product[] | Product> {
    console.log('resolver', route.params, state);

    return this.productService.getProductBySlug(route.params['slug']);
    // return null;
  }
}
