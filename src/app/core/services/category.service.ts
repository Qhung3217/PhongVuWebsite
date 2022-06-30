import { Category } from './../models/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

interface dataResponse {
  page: number;
  limit: number;
  totalRow: number;
  totalPage: number;
  data: Category[];
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categories: Category[] = [];
  categoriesChanged = new Subject<Category[]>();
  constructor(private http: HttpClient) {}
  fetchData() {
    let queryParams = new HttpParams().append('sort[name]', 'asc');
    return this.http
      .get<dataResponse>(environment.urlApi + '/categories', {
        params: queryParams,
      })
      .pipe(
        map((dataResponse) => {
          console.log(dataResponse);
          return dataResponse.data;
        }),
        tap((categories) => this.setCategories(categories))
      );
  }
  getCategories() {
    if (this.categories.length === 0) return [];
    return this.categories.slice();
  }

  setCategories(categories: Category[]) {
    this.categories = categories.slice();
    this.categoriesChanged.next(categories.slice());
  }
}
