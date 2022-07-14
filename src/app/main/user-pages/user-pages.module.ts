import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule } from 'src/app/auth/Auth.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthInterceptorService } from 'src/app/core/interceptors/auth-interceptor.service';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserPagesRoutingModule } from './user-pages-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    UserPageComponent,
  ],
  imports: [ComponentsModule, AuthModule, UserPagesRoutingModule],
})
export class UserPagesModule {}
