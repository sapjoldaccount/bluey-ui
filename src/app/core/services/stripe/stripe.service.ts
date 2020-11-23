import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { LogService } from 'src/app/shared/services/log/log.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { environment } from 'src/environments/environment';
import { ShopItem } from '../../models/ShopItem';
import { CartService } from '../cart/cart.service';
declare let Stripe: any;

// TEST
// const STRIPE_KEY =
//   'pk_test_51HTvjPIZSSMTzx9q3y3wVERaQgs10XDyMD1H7gJfBnhKThU2EcPvW81AyzAvx5lgdrgOpnvxDAzMLKJRopQKdHSa00dsimlkSL';

// PROD
const STRIPE_KEY =
  'pk_live_51HTvjPIZSSMTzx9qLfOIxlswIeMKuhBjcPuEWPHm6BdbPtcia736NfCzzZx7ZGCsipJQYBQYF7XBNehaVMUvpZir0049z9rutl';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(
    private cart: CartService,
    private spinner: NgxSpinnerService,
    private spinnerService: SpinnerService,
    private http: HttpClient,
    private log: LogService
  ) {}

  // Create a Checkout Session with the selected quantity
  createCheckoutSession(stripeLineItems: any[]): Promise<any> {
    // TODO: change to the "angular" way, prod vs. local builds...
    return fetch(`${environment.apiBaseUrl}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItems: stripeLineItems,
      }),
    }).then((result) => {
      return result.json();
    });
  }

  // Get a checkout session to verify user can activate success/cancel pages
  retrieveCheckoutSession(sessionId: string): Observable<any> {
    return this.http
      .get(`${environment.apiBaseUrl}/checkout-session/${sessionId}`)
      .pipe(
        catchError((err) => {
          this.log.logError('getting session', 'retrieveCheckoutSession()');
          return of(null);
        }),
        map((resp) => {
          this.log.logDebug('Got session succesfully.');
          return resp;
        }),
        finalize(() => {})
      );
  }

  // Redirect user to stripe-hosted checkout page
  redirectToCheckout(itemsInCart: ShopItem[]): void {
    const stripeLineItems = itemsInCart.map((i) => {
      return {
        price: i.stripe_id,
        quantity: 1,
      };
    });

    // Add flat rate shipping item
    stripeLineItems.push({
      price: 'price_1HnSz0IZSSMTzx9qsNnRBgkm',
      quantity: 1,
    });

    this.spinnerService.updateSpinnerStatus('redirecting');
    this.spinner.show();

    const stripe = Stripe(STRIPE_KEY);

    // TODO: Error handling
    this.createCheckoutSession(stripeLineItems).then((data) => {
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId,
        })
        .then((result) => {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            // const displayError = document.getElementById('error-message');
            // displayError.textContent = result.error.message;
          }
        });
    });
  }
}
