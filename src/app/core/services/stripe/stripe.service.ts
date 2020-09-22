import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { BehaviorSubject } from 'rxjs';
import { ShopItem } from '../../models/Product';
import { CartService } from '../cart/cart.service';
declare let Stripe: any;

const STRIPE_KEY =
  'pk_test_51HTvjPIZSSMTzx9q3y3wVERaQgs10XDyMD1H7gJfBnhKThU2EcPvW81AyzAvx5lgdrgOpnvxDAzMLKJRopQKdHSa00dsimlkSL';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private cart: CartService, private spinner: NgxSpinnerService) {}

  redirectToCheckout(itemsInCart: ShopItem[]): void {
    const stripeLineItems = itemsInCart.map((i) => {
      return { price: i.stripe_id, quantity: 1 };
    });

    this.cart.updateSpinnerStatus('redirecting');
    this.spinner.show();

    const stripe = Stripe(STRIPE_KEY);

    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe
      .redirectToCheckout({
        lineItems: stripeLineItems,
        mode: 'payment',
        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfill-orders
        successUrl: 'https://blueyshop.com/success',
        cancelUrl: 'https://blueyshop.com/cancelled',
      })
      .then((result) => {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          const displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      });
  }
}
