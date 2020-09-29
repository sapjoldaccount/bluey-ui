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

  // Create a Checkout Session with the selected quantity
  createCheckoutSession(): Promise<any> {
    let quantity = 1;

    return fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    }).then((result) => {
      return result.json();
    });
  }

  redirectToCheckout(itemsInCart: ShopItem[]): void {
    const stripeLineItems = itemsInCart.map((i) => {
      return {
        price: i.stripe_id,
        quantity: 1,
        // tax_rates: [
        //   'txr_1HWW4BIZSSMTzx9qaLijQptA',
        //   // additional tax rates
        // ],
      };
    });

    this.cart.updateSpinnerStatus('redirecting');
    this.spinner.show();

    const stripe = Stripe(STRIPE_KEY);

    // When the customer clicks on the button, redirect
    // them to Checkout.
    this.createCheckoutSession().then((data) => {
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId,
        })
        .then((result) => {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            const displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
    });
  }
}
