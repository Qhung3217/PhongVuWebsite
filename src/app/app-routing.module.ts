import { CartPageComponent } from './main/cart-page/cart-page.component';
import { ProductFilterSlugResolver } from './core/services/product-filter-slug-resolver.service';
import { DetailPageComponent } from './main/detail-page/detail-page.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'cart',
    component: CartPageComponent,
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
