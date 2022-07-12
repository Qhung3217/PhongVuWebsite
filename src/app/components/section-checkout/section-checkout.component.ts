import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { UserService } from 'src/app/core/services/user.service';
import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { AddressService } from 'src/app/core/services/address.service';
import { Address } from 'src/app/core/models/address.model';
import { User } from 'src/app/core/models/user.model';
import { OrderService } from 'src/app/core/services/order.service';
import { PaymentMethodService } from 'src/app/core/services/payment-method.service';

@Component({
  selector: 'app-section-checkout',
  templateUrl: './section-checkout.component.html',
  styleUrls: ['./section-checkout.component.scss'],
})
export class SectionCheckoutComponent implements OnInit, OnDestroy {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  totalPrice: number = 0;
  carts;
  cartSub: Subscription;
  addresses: Address[];
  addressSub: Subscription;
  isLoadings = {
    address: false,
  };
  user: User;
  userSub: Subscription;
  paymentElementForm;
  paying = false;
  addressSelected: Address;
  isAlert = false;
  toast;
  cards;
  paymentSelected;

  constructor(
    private userService: UserService,
    private stripeService: StripeService,
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
    private paymentMethodService: PaymentMethodService
  ) {}
  ngOnInit(): void {
    this.userService.addPaymentStripe().subscribe((res) => {
      console.log(res.data);
      this.addClientSecret(res.data);
    });
    this.initForm();
    this.initCart();
    this.initAddress();
    this.initUser();
    this.paymentMethodService.getListPaymentMethods().subscribe((res) => {
      console.log('payment: ', res);
      this.cards = [...res];
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.addressSub) this.addressSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }
  initUser() {
    this.user = this.userService.getOwnProfile();
    this.userSub = this.userService.userChanged.subscribe(
      (user) => (this.user = { ...user })
    );
  }
  initAddress() {
    this.isLoadings.address = true;
    this.addressService.fetchData().subscribe((addresses) => {
      this.addresses = addresses;
      this.isLoadings.address = false;
      this.autoSelectDefaultAddress();
    });
    this.addressSub = this.addressService.addressChanged.subscribe(
      (addresses) => {
        this.addresses = addresses;
        this.autoSelectDefaultAddress();
      }
    );
  }
  initCart() {
    this.carts = this.cartService.carts;
    this.totalPrice = this.calcTotalPrice(this.carts);
    this.cartSub = this.cartService.cartsChanged.subscribe((carts) => {
      this.carts = [...carts];
      this.totalPrice = this.calcTotalPrice(carts);
    });
  }
  calcTotalPrice(carts) {
    return carts.reduce(
      (total, cart) => (total += cart.quantity * cart.item.price),
      0
    );
  }
  initForm() {
    this.paymentElementForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }
  autoSelectDefaultAddress() {
    this.addressSelected = this.addresses.find(
      (address) => address.isDefault === true
    );
    if (!this.addressSelected && this.addresses) {
      this.selectAddress(0);
      console.log('select 0');
    }
  }
  selectAddress(index) {
    this.addressSelected = { ...this.addresses[index] };
  }
  addClientSecret(resData) {
    this.elementsOptions.clientSecret = resData.client_secret;
  }
  changePaymentSelected(index) {
    this.paymentSelected = { ...this.cards[index] };
  }
  pay() {
    this.paying = true;
    this.stripeService
      .confirmSetup({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.user?.firstName + ' ' + this.user?.lastName,
              email: this.user.email,
              phone: this.user?.phone,
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        console.log('Result', result);
        this.callOrder(result?.setupIntent.payment_method);
      });
  }

  private callOrder(methodId) {
    const items = this.makeItems();
    if (items)
      this.orderService
        .createOrder(this.addressSelected, items, methodId)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.paying = false;
            this.toast = {
              type: 'success',
              message: 'Your payment is successfully. Thank you for purchase.',
            };
            this.isAlert = true;
          },
          error: (err) => {
            console.log('err', err);
            this.paying = false;
            this.toast = {
              type: 'Erorr',
              message: 'Error occured while process. Please try again',
            };
            this.isAlert = true;
          },
        });
  }
  private makeItems() {
    let items = [];
    if (this.carts)
      this.carts.forEach((cart) => {
        items.push({ productId: cart.item._id, quantity: cart.quantity });
      });
    else return null;
    return items;
  }
}
