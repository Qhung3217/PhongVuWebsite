import { Subscription } from 'rxjs';
import { CartService } from './../../core/services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  countCarts;
  userInfor;
  briefInfor: {
    name: string;
    email: string;
    avatar: string;
  };
  userSub: Subscription;
  cartSub: Subscription;
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setUserInfor();
    this.setCountCarts();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }
  setUserInfor() {
    this.userInfor = this.userService.getOwnProfile();
    this.setBriefInfor();
    this.userSub = this.userService.userChanged.subscribe((user) => {
      this.userInfor = user;
      this.setBriefInfor();
    });
  }
  setCountCarts() {
    this.countCarts = this.cartService.getTotalQuantityInCarts();

    // this.counterQuantity();
    this.cartSub = this.cartService.cartsChanged.subscribe(
      (carts) => (this.countCarts = this.cartService.getTotalQuantityInCarts())
    );
  }
  setBriefInfor() {
    if (this.userInfor)
      this.briefInfor = {
        name:
          this.userInfor?.firstName &&
          this.userInfor?.lastName &&
          this.userInfor.firstName + ' ' + this.userInfor.lastName,
        email: this.userInfor.email,
        avatar: this.userInfor?.avatar,
      };
  }
  /* no change countCarts ?
  counterQuantity(carts = null) {
    // console.log(this.cartService.getCarts());
    // if (!this.cartService.getCarts()) return 0;
    if (!carts) {
      console.log('cart null');
      this.countCarts = this.cartService
        .getCarts()
        .reduce((total, cart) => (total += cart.quantity), 0);
    } else {
      this.countCarts = carts.reduce(
        (total, cart) => (total += cart.quantity),
        0
      );
      console.log('cart not null', this.countCarts);
    }
  }*/
}
