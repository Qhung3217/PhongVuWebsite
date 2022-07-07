import { AuthGuard } from './core/guards/auth.guard';
import { CheckoutPageComponent } from './main/user-pages/checkout-page/checkout-page.component';
import { LoginPageComponent } from './main/user-pages/login-page/login-page.component';
import { CartPageComponent } from './main/public-pages/cart-page/cart-page.component';
import { ProductFilterSlugResolver } from './core/services/product-filter-slug-resolver.service';
import { DetailPageComponent } from './main/public-pages/detail-page/detail-page.component';
import { LandingPageComponent } from './main/public-pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './main/user-pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'authenticate',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':slug',
    component: DetailPageComponent,
    resolve: [ProductFilterSlugResolver],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
