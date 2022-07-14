import { ProductFilterSlugResolver } from './../../core/services/product-filter-slug-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [CartPageComponent, DetailPageComponent, LandingPageComponent],
  imports: [
    ComponentsModule,
    RouterModule.forChild([
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
    ]),
  ],
})
export class PublicPagesModule {}
