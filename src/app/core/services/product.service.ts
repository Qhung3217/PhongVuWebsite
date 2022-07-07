import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Subject,
  map,
  tap,
  switchMap,
  exhaustMap,
  take,
  lastValueFrom,
  Observable,
} from 'rxjs';
import { environment } from 'src/environments/environment';

export interface dataResponse {
  page: number;
  limit: number;
  totalRow: number;
  totalPage: number;
  data: Product[] | Product;
}
@Injectable({ providedIn: 'root' })
export class ProductService {
  products: Product[];
  productSeleted: Product;
  dataResponse: dataResponse;
  productsChanged = new Subject<Product[]>();
  id: string;
  productSelectedChanged = new Subject<Product>();
  constructor(private http: HttpClient) {}
  fetchData() {
    let queryParams = new HttpParams().append('sort[createdAt]', 'asc');
    queryParams = queryParams.append('page', 1);
    queryParams = queryParams.append('limit', 20);
    return this.http
      .get<dataResponse>(environment.urlApi + '/products', {
        params: queryParams,
      })
      .pipe(
        map((dataResponse) => {
          console.log(dataResponse);
          this.dataResponse = { ...dataResponse };
          return dataResponse.data;
        }),
        tap((products: Product[]) => this.setProducts(products))
      );
  }
  fetchDataPerPage(page = 1) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('sort[createdAt]', 'asc');
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('limit', 20);
    // console.log('queryPrams: ', queryParams);
    return this.http
      .get<dataResponse>(environment.urlApi + '/products', {
        params: queryParams,
      })
      .pipe(
        map((dataResponse) => {
          console.log(dataResponse);
          this.dataResponse = { ...dataResponse };
          return dataResponse.data;
        })
      );
  }
  fetchDataByCategoryIdOrProductId(criteria: string, key: string) {
    console.log('crs map');

    let queryParams = new HttpParams();

    if (criteria === 'category') {
      queryParams = queryParams.append('where[category][$eq]', key);
      queryParams = queryParams.append('page', 1);
      queryParams = queryParams.append('limit', 20);
    }
    if (criteria === 'id')
      return this.http
        .get<dataResponse>(environment.urlApi + '/products/' + key)
        .pipe(
          map((dataResponse) => {
            console.log(dataResponse);
            return dataResponse.data;
          }),
          tap((product) => {
            this.productSeleted = product as Product;
            this.productSelectedChanged.next(this.productSeleted);
          })
        );
    return this.http.get<dataResponse>(environment.urlApi + '/products', {
      params: queryParams,
    });
    // .pipe
    // // map((dataResponse) => {
    // //   console.log(dataResponse);
    // //   // this.dataResponse = dataResponse;
    // //   return dataResponse.data;
    // // })
    // ();
  }
  fetchProductByCriteria(criteria: string, flag: string, key) {
    let queryParams = new HttpParams();

    const stringQuery = `where[${criteria}][${flag}]`;
    console.log(stringQuery);
    queryParams = queryParams.append(stringQuery, key);
    queryParams = queryParams.append('page', 1);
    queryParams = queryParams.append('limit', 20);
    return this.http
      .get<dataResponse>(environment.urlApi + '/products', {
        params: queryParams,
      })
      .pipe(
        map((dataResponse) => {
          return dataResponse.data;
        })
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
  getProductsByCategoryId(id: string): Observable<dataResponse> {
    // if (!this.products) return [];
    return this.fetchDataByCategoryIdOrProductId(
      'category',
      id
    ) as Observable<dataResponse>;
  }
  retrieveProductIdBySlug(slug: string) {
    let product;
    if (this.products)
      product = this.products.find((product) => product.slug === slug);
    if (product) this.id = product._id;
    else {
      let queryParams = new HttpParams();
      queryParams = queryParams.append('where[slug][$eq]', slug);
      console.log('retrieve', slug);
      this.http
        .get<dataResponse>(environment.urlApi + '/products', {
          params: queryParams,
        })
        .pipe(
          map((dataResponse) => {
            console.log(dataResponse);
            return dataResponse.data;
          })
        )
        .subscribe((products) => {
          this.id = products[0]._id;
          console.log('id fetch: ', products);
        });
      console.log('id retrieve: ', this.id);
    }
  }
  getProductDetailBySlug(slug: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('where[slug][$eq]', slug);
    console.log('retrieve', slug);
    return this.http
      .get<dataResponse>(environment.urlApi + '/products', {
        params: queryParams,
      })
      .pipe(
        take(1),
        map((dataResponse) => {
          console.log(dataResponse);
          return dataResponse.data;
        }),
        exhaustMap((products) =>
          this.fetchDataByCategoryIdOrProductId('id', products[0]._id)
        )
      );
  }
  async getProductBySlug(slug: string) {
    const product = await lastValueFrom(
      this.fetchProductByCriteria('slug', '$eq', slug),
      { defaultValue: null }
    );
    return product;
    // console.log('product: ', product, slug);
  }
}
