import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { PayloadAdress } from './address.service';

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
}
