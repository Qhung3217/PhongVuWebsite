import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { loadStripe } from '@stripe/stripe-js';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  paymentHandler;
  stripe;
  card;
  constructor(private titleService: Title, private userService: UserService) {
    this.titleService.setTitle('PhongVu - Checkout');
  }
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.STRIPE_PUBLIC_KEY,
      locale: 'en_AU',
      token: function (stripeToken: any) {
        console.log({ stripeToken });
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100,
    });
  }
  async setupPayment(option) {
    this.stripe = await loadStripe(environment.STRIPE_PUBLIC_KEY);

    const elements = this.stripe.elements({
      clientSecret: option.client_secret,
    });

    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { style: style });
    this.card.mount('#strip-el');
    // const paymentHandler = (<any>window).StripeCheckout.configure({
    //   key: environment.STRIPE_PUBLIC_KEY,
    //   locale: 'auto',
    //   token: function (stripeToken: any) {
    //     console.log({ stripeToken });
    //     alert('Stripe token generated!');
    //   },
    // });

    // paymentHandler.open({
    //   name: 'FreakyJolly',
    //   description: 'Buying a Hot Coffee',
    //   amount: amount * 100,
    // });
  }

  ngOnInit(): void {
    this.userService.addPaymentStripe().subscribe((res) => {
      console.log(res.data);
      this.setupPayment(res.data);
    });
  }
  onSubmit(form) {
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        const owerInfo = {
          amount: 2 * 100,
          currency: 'AUD',
        };
        try {
          this.stripe
            .createSource(this.card, owerInfo)
            .then((result) => console.log(result));
          // console.log(result)
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  }
}
