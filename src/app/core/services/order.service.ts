import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { PayloadAdress } from './address.service';

interface OrderRes {
  page: number;
  limit: number;
  totalRow: number;
  totalPage: number;
  data: Order[];
}
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(
    address: PayloadAdress,
    items: { productId: string; quantity: number }[],
    paymentMethodId: string
  ) {
    return this.http.post(environment.urlApi + '/orders', {
      address: address,
      items: items,
      paymentMethodId: paymentMethodId,
      notes: '',
    });
  }
  getOrders(page = 1, limit = 20) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('limit', limit);
    return this.http.get<OrderRes>(environment.urlApi + '/orders', {
      params: queryParams,
    });
  }
  getOrder(id: string) {
    return this.http
      .get<{ data: Order }>(environment.urlApi + '/orders/' + id)
      .pipe(map((response) => response.data));
  }
}
