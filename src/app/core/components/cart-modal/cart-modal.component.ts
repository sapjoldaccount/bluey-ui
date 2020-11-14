import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { environment } from 'src/environments/environment';
import { ShopItem } from '../../models/ShopItem';
import { CartService } from '../../services/cart/cart.service';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                                 CART MODAL                                 */
/* -------------------------------------------------------------------------- */
/*                           OPENED UPON CART CLICK                           */
/* -------------------------------------------------------------------------- */
export class CartModalComponent implements OnInit {
  productsInCart$ = this.cart.productsInCart$;

  /**
   * Calculates total pre-tax/shipping USD of cart
   */
  cartTotal$: Observable<number> = this.productsInCart$.pipe(
    map(
      (products) =>
        Math.round(
          (products.map((p) => p.price).reduce((a, b) => a + b, 0) +
            (products.length > 0 ? 9.99 : 0)) *
            100
        ) / 100
    )
  );

  cdnBaseUrl = environment.cdnBaseUrl;

  constructor(
    private cart: CartService,
    public modalRef: MDBModalRef,
    private stripe: StripeService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  /* -------------------------------------------------------------------------- */
  /*                                CART ACTIONS                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Remove item from cart via modal
   * @param item - item to remove
   */
  removeItemFromCart(item: ShopItem): void {
    this.spinnerService.updateSpinnerStatus('removing');
    this.cart.removeShopItemFromCart(item.id);
  }

  /**
   * Redirect to stripe checkout
   * @param itemsInCart - items the user plans to buy
   */
  onCheckoutClick(itemsInCart: ShopItem[]): void {
    this.stripe.redirectToCheckout(itemsInCart);
  }
}
