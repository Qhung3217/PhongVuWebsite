import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeAddressesComponent } from 'src/app/components/section-me/me-addresses/me-addresses.component';
import { MeNotifyComponent } from 'src/app/components/section-me/me-notify/me-notify.component';
import { MeOrderComponent } from 'src/app/components/section-me/me-order/me-order.component';
import { MeProfileComponent } from 'src/app/components/section-me/me-profile/me-profile.component';
import { MeWishlistComponent } from 'src/app/components/section-me/me-wishlist/me-wishlist.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: 'authenticate',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'me',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: MeProfileComponent },
      { path: 'address', component: MeAddressesComponent },
      { path: 'order', component: MeOrderComponent },
      { path: 'notify', component: MeNotifyComponent },
      { path: 'wishlist', component: MeWishlistComponent },
    ],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPagesRoutingModule {}
