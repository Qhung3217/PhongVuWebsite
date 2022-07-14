import { DynamicModule } from 'ng-dynamic-component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgModule } from '@angular/core';

import { SectionRecommendComponent } from './section-recommend/section-recommend.component';
import { MeWishlistComponent } from './section-me/me-wishlist/me-wishlist.component';
import { MeProfileComponent } from './section-me/me-profile/me-profile.component';
import { MeOrderComponent } from './section-me/me-order/me-order.component';
import { SectionMeComponent } from './section-me/section-me.component';
import { SectionDetailProductComponent } from './section-detail-product/section-detail-product.component';
import { CartComponent } from './section-cart/cart/cart.component';
import { SectionCheckoutComponent } from './section-checkout/section-checkout.component';
import { SectionBestSellerInMonthComponent } from './section-best-seller-in-month/section-best-seller-in-month.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DealListComponent } from './deal-table/deal-list/deal-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAsideComponent } from './header/header-aside/header-aside.component';
import { HeaderPopupComponent } from './header/header-popup/header-popup.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubNavComponent } from './navbar/sub-nav/sub-nav.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SectionCartComponent } from './section-cart/section-cart.component';
import { ImageModelComponent } from './section-detail-product/image-model/image-model.component';
import { SectionHeroComponent } from './section-hero/section-hero.component';
import { SectionHotDealComponent } from './section-hot-deal/section-hot-deal.component';
import { MeAddressesComponent } from './section-me/me-addresses/me-addresses.component';
import { MeNotifyComponent } from './section-me/me-notify/me-notify.component';
import { TabPaneComponent } from './section-me/tab-pane/tab-pane.component';
import { SectionShowProductComponent } from './section-show-product/section-show-product.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealTableComponent } from './deal-table/deal-table.component';
import { ItemComponent } from './section-me/me-order/item/item.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './section-me/me-addresses/address/address.component';
import { AddressAddModelComponent } from './section-me/me-addresses/address-add-model/address-add-model.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    DealTableComponent,
    DealListComponent,
    FooterComponent,
    HeaderComponent,
    HeaderAsideComponent,
    HeaderPopupComponent,
    UserMenuComponent,
    NavbarComponent,
    SubNavComponent,
    ProductComponent,
    ProductListComponent,
    PromotionListComponent,
    SectionBestSellerInMonthComponent,
    SectionCartComponent,
    CartComponent,
    SectionCheckoutComponent,
    SectionDetailProductComponent,
    ImageModelComponent,
    SectionHeroComponent,
    SectionHotDealComponent,
    SectionMeComponent,
    MeAddressesComponent,
    AddressComponent,
    AddressAddModelComponent,
    MeNotifyComponent,
    MeOrderComponent,
    MeProfileComponent,
    MeWishlistComponent,
    TabPaneComponent,
    SectionRecommendComponent,
    SectionShowProductComponent,
    ToastMessageComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SlickCarouselModule,
    NgxPaginationModule,
    DynamicModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbComponent,
    DealTableComponent,
    DealListComponent,
    FooterComponent,
    HeaderComponent,
    HeaderAsideComponent,
    HeaderPopupComponent,
    UserMenuComponent,
    NavbarComponent,
    SubNavComponent,
    ProductComponent,
    ProductListComponent,
    PromotionListComponent,
    SectionBestSellerInMonthComponent,
    SectionCartComponent,
    CartComponent,
    SectionCheckoutComponent,
    SectionDetailProductComponent,
    ImageModelComponent,
    SectionHeroComponent,
    SectionHotDealComponent,
    SectionMeComponent,
    MeAddressesComponent,
    AddressComponent,
    AddressAddModelComponent,
    MeNotifyComponent,
    MeOrderComponent,
    MeProfileComponent,
    MeWishlistComponent,
    TabPaneComponent,
    SectionRecommendComponent,
    SectionShowProductComponent,
    ToastMessageComponent,
    ItemComponent,
  ],
})
export class ComponentsModule {}
