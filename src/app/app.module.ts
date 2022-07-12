import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { LandingPageComponent } from './main/public-pages/landing-page/landing-page.component';
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
import { QRIconComponent } from './shared/icons/qr-icon/qr-icon.component';
import { CashIconComponent } from './shared/icons/cash-icon/cash-icon.component';
import { ClockIconComponent } from './shared/icons/clock-icon/clock-icon.component';
import { CreditCardIconComponent } from './shared/icons/credit-card-icon/credit-card-icon.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderPopupComponent } from './components/header/header-popup/header-popup.component';
import { DetailPageComponent } from './main/public-pages/detail-page/detail-page.component';
import { HomeIconComponent } from './shared/icons/home-icon/home-icon.component';
import { SectionDetailProductComponent } from './components/section-detail-product/section-detail-product.component';
import { GiftIconComponent } from './shared/icons/gift-icon/gift-icon.component';
import { DeliveryIconComponent } from './shared/icons/delivery-icon/delivery-icon.component';
import { ProtectionIconComponent } from './shared/icons/protection-icon/protection-icon.component';
import { ReturnsIconComponent } from './shared/icons/returns-icon/returns-icon.component';
import { GearIconComponent } from './shared/icons/gear-icon/gear-icon.component';
import { DesktopIconComponent } from './shared/icons/desktop-icon/desktop-icon.component';
import { ArrowDownIconComponent } from './shared/icons/arrow-down-icon/arrow-down-icon.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ImageModelComponent } from './components/section-detail-product/image-model/image-model.component';
import { CountImageOverflowDirective } from './shared/directives/count-image-overflow.directive';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { CheckedIconComponent } from './shared/icons/checked-icon/checked-icon.component';
import { ExclamationIconComponent } from './shared/icons/exclamation-icon/exclamation-icon.component';
import { CartPageComponent } from './main/public-pages/cart-page/cart-page.component';
import { SectionCartComponent } from './components/section-cart/section-cart.component';
import { LineIconComponent } from './shared/icons/line-icon/line-icon.component';
import { MinusIconComponent } from './shared/icons/minus-icon/minus-icon.component';
import { PlusIconComponent } from './shared/icons/plus-icon/plus-icon.component';
import { CheckboxIconComponent } from './shared/icons/checkbox-icon/checkbox-icon.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './main/user-pages/login-page/login-page.component';
import { RegisterPageComponent } from './main/user-pages/register-page/register-page.component';
import { CheckoutPageComponent } from './main/user-pages/checkout-page/checkout-page.component';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { UserPageComponent } from './main/user-pages/user-page/user-page.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { AddressIconComponent } from './shared/icons/address-icon/address-icon.component';
import { WishlistIconComponent } from './shared/icons/wishlist-icon/wishlist-icon.component';
import { DynamicModule } from 'ng-dynamic-component';
import { SectionMeComponent } from './components/section-me/section-me.component';
import { TabPaneComponent } from './components/section-me/tab-pane/tab-pane.component';
import { MeProfileComponent } from './components/section-me/me-profile/me-profile.component';
import { MeOrderComponent } from './components/section-me/me-order/me-order.component';
import { MeAddressesComponent } from './components/section-me/me-addresses/me-addresses.component';
import { MeNotifyComponent } from './components/section-me/me-notify/me-notify.component';
import { MeWishlistComponent } from './components/section-me/me-wishlist/me-wishlist.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { NgxStripeModule } from 'ngx-stripe';
import { SectionCheckoutComponent } from './components/section-checkout/section-checkout.component';
import { environment } from 'src/environments/environment';
import { CartComponent } from './components/section-cart/cart/cart.component';
import { AddressComponent } from './components/section-me/me-addresses/address/address.component';
import { AddressAddModelComponent } from './components/section-me/me-addresses/address-add-model/address-add-model.component';
import { TrashIconComponent } from './shared/icons/trash-icon/trash-icon.component';
import { CreateIconComponent } from './shared/icons/create-icon/create-icon.component';

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
    QRIconComponent,
    CashIconComponent,
    ClockIconComponent,
    CreditCardIconComponent,
    HeaderPopupComponent,
    DetailPageComponent,
    HomeIconComponent,
    SectionDetailProductComponent,
    GiftIconComponent,
    DeliveryIconComponent,
    ProtectionIconComponent,
    ReturnsIconComponent,
    GearIconComponent,
    DesktopIconComponent,
    ArrowDownIconComponent,
    LoadingSpinnerComponent,
    ImageModelComponent,
    CountImageOverflowDirective,
    BreadcrumbComponent,
    ToastMessageComponent,
    CheckedIconComponent,
    ExclamationIconComponent,
    CartPageComponent,
    SectionCartComponent,
    LineIconComponent,
    MinusIconComponent,
    PlusIconComponent,
    CheckboxIconComponent,
    LoginComponent,
    RegisterComponent,

    LoginPageComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    UserPageComponent,
    UserMenuComponent,
    AddressIconComponent,
    WishlistIconComponent,
    SectionMeComponent,
    TabPaneComponent,
    MeProfileComponent,
    MeOrderComponent,
    MeAddressesComponent,
    MeNotifyComponent,
    MeWishlistComponent,
    DropdownDirective,
    SectionCheckoutComponent,
    CartComponent,
    AddressComponent,
    AddressAddModelComponent,
    TrashIconComponent,
    CreateIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxPaginationModule,
    HttpClientModule,
    DynamicModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLIC_KEY),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
