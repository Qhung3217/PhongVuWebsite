import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './shared/slider/slider.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderAsideComponent } from './components/header/header-aside/header-aside.component';
import { HeadsetIconComponent } from './components/header/icons/headset-icon/headset-icon.component';
import { BusinessIconComponent } from './components/header/icons/business-icon/business-icon.component';
import { DesktopNewsIconComponent } from './components/header/icons/desktop-news-icon/desktop-news-icon.component';
import { BuildIconComponent } from './components/header/icons/build-icon/build-icon.component';
import { SearchIconComponent } from './components/header/icons/search-icon/search-icon.component';
import { DiscountIconComponent } from './components/header/icons/discount-icon/discount-icon.component';
import { OrderIconComponent } from './components/header/icons/order-icon/order-icon.component';
import { UserIconComponent } from './components/header/icons/user-icon/user-icon.component';
import { BellIconComponent } from './components/header/icons/bell-icon/bell-icon.component';
import { CartIconComponent } from './components/header/icons/cart-icon/cart-icon.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

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
