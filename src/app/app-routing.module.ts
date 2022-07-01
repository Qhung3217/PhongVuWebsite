import { DetailPageComponent } from './main/detail-page/detail-page.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from './core/services/product-resolver.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: ':slug',
    component: DetailPageComponent,
    resolve: [ProductResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
