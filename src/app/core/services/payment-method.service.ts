import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetupIntent } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentMethodService {
  constructor(private stripeService: StripeService, private http: HttpClient) {}

  getListPaymentMethods() {
    return this.http
      .get<{ data: SetupIntent[] }>(
        environment.urlApi + '/users/me/payment-methods'
      )
      .pipe(map((res) => res.data));
  }
}
