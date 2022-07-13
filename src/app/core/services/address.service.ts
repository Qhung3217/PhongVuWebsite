import { map, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
export interface PayloadAdress {
  fullName?: string;
  phone?: string;
  address?: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string;
  isDefault?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AddressService {
  addresses: Address[];
  addressChanged = new Subject<{ address: Address[]; type?: string }>();
  constructor(private http: HttpClient) {}

  fetchData(type = 'list') {
    return this.http
      .get<{ data: Address[] }>(environment.urlApi + '/users/me/addresses')
      .pipe(
        map((response) => response.data),
        tap((addresses) =>
          this.addressChanged.next({ address: [...addresses], type: type })
        )
      );
  }
  getAddresses() {
    if (this.addresses) return [];
    return this.addresses.slice();
  }

  createAddress(address: PayloadAdress) {
    return this.http
      .post<{ data: Address }>(environment.urlApi + '/users/me/addresses', {
        ...address,
      })
      .pipe(
        map((response) => response.data),
        tap(() => this.fetchData('create').subscribe())
      );
  }

  updateAddress(payload: PayloadAdress, id: string) {
    return this.http
      .put<{ data: Address }>(
        environment.urlApi + '/users/me/addresses/' + id,
        {
          ...payload,
        }
      )
      .pipe(
        map((response) => response.data),
        tap(() => this.fetchData('update').subscribe())
      );
  }

  removeAddress(id: string) {
    return this.http
      .delete<{ message: string }>(
        environment.urlApi + '/users/me/addresses/' + id
      )
      .pipe(tap(() => this.fetchData().subscribe()));
  }
}
