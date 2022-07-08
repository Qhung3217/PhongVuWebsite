import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  user: User = null;
  userChanged = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}
  fetchOwnProfile() {
    console.log('user');

    return this.http
      .get<{ data: User }>(environment.urlApi + '/users/me/profile')
      .pipe(
        map((res) => res.data),
        tap((user) => {
          this.userChanged.next({ ...user });
        }),
        tap(this.setUser)
      );
  }
  getOwnProfile() {
    if (this.user) return { ...this.user };
  }
  addPaymentStripe() {
    return this.http.post<{ data: {} }>(
      environment.urlApi + '/users/me/payment-methods',
      {}
    );
  }
  clearUser() {
    this.user = null;
    this.userChanged.next(null);
  }
  private setUser(user: User) {
    console.log({ ...user });
    this.user = { ...user };
  }
}
