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
import { SectionBestSellerInMonthComponent } from './components/section-best-seller-in-month/section-best-seller-in-month.component';
import { StickyHeaderDirective } from './shared/directives/sticky-header.directive';
import { MenuIconComponent } from './shared/icons/menu-icon/menu-icon.component';
import { ShowCatalogDirective } from './shared/directives/show-catalog.directive';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SectionShowProductComponent } from './components/section-show-product/section-show-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { FacebookLogoComponent } from './shared/icons/facebook-logo/facebook-logo.component';
import { YoutubeLogoComponent } from './shared/icons/youtube-logo/youtube-logo.component';
import { ClanIconComponent } from './shared/icons/clan-icon/clan-icon.component';

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
    SectionBestSellerInMonthComponent,
    StickyHeaderDirective,
    MenuIconComponent,
    ShowCatalogDirective,
    ProductListComponent,
    SectionShowProductComponent,
    FooterComponent,
    FacebookLogoComponent,
    YoutubeLogoComponent,
    ClanIconComponent,
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
