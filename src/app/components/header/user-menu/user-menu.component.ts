import { AddressIconComponent } from './../../../shared/icons/address-icon/address-icon.component';
import { WishlistIconComponent } from './../../../shared/icons/wishlist-icon/wishlist-icon.component';
import { Component, Input, OnInit } from '@angular/core';
import { BellIconComponent } from 'src/app/shared/icons/bell-icon/bell-icon.component';
import { OrderIconComponent } from 'src/app/shared/icons/order-icon/order-icon.component';
import { UserIconComponent } from 'src/app/shared/icons/user-icon/user-icon.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  @Input() briefInfo: {
    name: string;
    email: string;
    avatar: string;
  };
  menus = [
    {
      select: 'Profile',
      url: '/account/me/profile',
      icon: UserIconComponent,
    },
    {
      select: 'Order managemant',
      url: '/account/me/order',
      icon: OrderIconComponent,
    },
    {
      select: 'Address book',
      url: '/account/me/address',
      icon: AddressIconComponent,
    },
    // {
    //   select: 'Notify',
    //   url: '/account/me/notify',
    //   icon: BellIconComponent,
    // },
    // {
    //   select: 'Wishlist',
    //   url: '/account/me/wishlist',
    //   icon: WishlistIconComponent,
    // },
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onLogout(event) {
    event.stopPropagation();
    this.authService.logout();
  }
}
