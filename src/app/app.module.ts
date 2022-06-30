import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './shared/slider/slider.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderAsideComponent } from './components/header/header-aside/header-aside.component';
import { HeadsetIconComponent } from './shared/icons/headset-icon/headset-icon.component';
import { BusinessIconComponent } from './shared/icons/business-icon/business-icon.component';
import { DesktopNewsIconComponent } from './shared/icons/desktop-news-icon/desktop-news-icon.component';
import { BuildIconComponent } from './shared/icons/build-icon/build-icon.component';
import { SearchIconComponent } from './shared/icons/search-icon/search-icon.component';
import { DiscountIconComponent } from './shared/icons/discount-icon/discount-icon.component';
import { OrderIconComponent } from './shared/icons/order-icon/order-icon.component';
import { UserIconComponent } from './shared/icons/user-icon/user-icon.component';
import { BellIconComponent } from './shared/icons/bell-icon/bell-icon.component';
import { CartIconComponent } from './shared/icons/cart-icon/cart-icon.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubNavComponent } from './components/navbar/sub-nav/sub-nav.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { SectionHeroComponent } from './components/section-hero/section-hero.component';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { SectionHotDealComponent } from './components/section-hot-deal/section-hot-deal.component';
import { DealTableComponent } from './components/deal-table/deal-table.component';
import { DealListComponent } from './components/deal-table/deal-list/deal-list.component';
import { ProductComponent } from './components/product/product.component';
import { FreeshipIconComponent } from './shared/icons/freeship-icon/freeship-icon.component';
import { SectionRecommendComponent } from './components/section-recommend/section-recommend.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HeaderComponent,
    NavbarComponent,
    HeaderAsideComponent,
    HeadsetIconComponent,
    BusinessIconComponent,
    DesktopNewsIconComponent,
    BuildIconComponent,
    SearchIconComponent,
    DiscountIconComponent,
    OrderIconComponent,
    UserIconComponent,
    BellIconComponent,
    CartIconComponent,
    SubNavComponent,
    LandingPageComponent,
    SectionHeroComponent,
    PromotionListComponent,
    SectionHotDealComponent,
    DealTableComponent,
    DealListComponent,
    ProductComponent,
    FreeshipIconComponent,
    SectionRecommendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
