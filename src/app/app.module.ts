import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

import { AuthModule } from './auth/Auth.module';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLIC_KEY),
    AuthModule,
    CoreModule,
    ComponentsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
