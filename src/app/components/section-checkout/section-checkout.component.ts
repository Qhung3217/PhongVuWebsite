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
import { Router } from '@angular/router';

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
  addresses: Address[];
  user: User;
  cards;
  cartSub: Subscription;
  addressSub: Subscription;
  userSub: Subscription;
  toast;
  addressSelected: Address;
  paymentSelected;
  formValid = false;
  isLoadings = {
    address: false,
  };
  paying = false;
  isAlert = false;
  isAddCard = false;
  isAddAddress = false;

  constructor(
    private userService: UserService,
    private stripeService: StripeService,
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
    private paymentMethodService: PaymentMethodService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.addPaymentStripe().subscribe((res) => {
      console.log(res.data);
      this.addClientSecret(res.data);
    });

    this.initAddress();
    this.initUser();
    this.initCard();
    this.initCart();
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
  initCard() {
    this.paymentMethodService.getListPaymentMethods().subscribe((res) => {
      console.log('payment: ', res);
      this.cards = [...res];
      if (this.cards.length === 0) {
        this.isAddCard = true;
      } else this.changePaymentSelected(0);
    });
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
        this.addresses = [...addresses.address];
        this.autoSelectDefaultAddress(addresses.type);
      }
    );
  }
  initCart() {
    this.carts = this.cartService.carts;
    this.checkFormValid();

    this.totalPrice = this.calcTotalPrice(this.carts);
    this.cartSub = this.cartService.cartsChanged.subscribe((carts) => {
      if (carts) {
        this.carts = [...carts];
        this.totalPrice = this.calcTotalPrice(carts);
      }
      this.checkFormValid();
    });
  }
  checkFormValid() {
    console.log(
      'checkFormValid:',
      !!this.paymentSelected,
      !!this.addressSelected,
      this.cards?.length === 0
    );
    this.formValid =
      !!this.paymentSelected &&
      !!this.addressSelected &&
      this.cards?.length > 0;
  }
  calcTotalPrice(carts) {
    if (carts)
      return carts.reduce(
        (total, cart) => (total += cart.quantity * cart.item.price),
        0
      );
    return 0;
  }

  autoSelectDefaultAddress(type = 'list') {
    this.addressSelected = this.addresses.find(
      (address) => address.isDefault === true
    );
    if (type !== 'list') {
      this.selectAddress(this.addresses.length - 1);
    } else if (!this.addressSelected && this.addresses) {
      this.selectAddress(0);
      console.log('select 0');
    }
  }
  removeCarts() {
    this.cartService.clearCarts();
  }
  selectAddress(index) {
    this.addressSelected = { ...this.addresses[index] };
    this.checkFormValid();
  }
  addClientSecret(resData) {
    this.elementsOptions.clientSecret = resData.client_secret;
    console.log(this.elementsOptions.clientSecret);
  }
  changePaymentSelected(index) {
    this.paymentSelected = { ...this.cards[index] };
    this.checkFormValid();
  }
  pay() {
    if (this.formValid) {
    }
    this.paying = true;
    if (this.isAddCard) {
      this.addCard();
    } else {
      this.callOrder(this.paymentSelected.id);
    }
  }
  private addCard() {
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
            this.cartService.clearCarts();

            setTimeout(() => this.router.navigate(['/']), 1200);
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
