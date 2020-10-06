import { Component, OnInit } from '@angular/core';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  templateUrl: './cancelled-container.component.html',
  styleUrls: ['./cancelled-container.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                           PURCHASE CANCELLED PAGE                          */
/* -------------------------------------------------------------------------- */
export class CancelledContainerComponent implements OnInit {
  productsInCart$ = this.cart.productsInCart$;

  constructor(private cart: CartService, private stripe: StripeService) {}

  ngOnInit(): void {}

  /**
   * Send users back to checkout to try again
   * @param itemsInCart - products they originally tried to buy
   */
  goBackToCheckout(itemsInCart: ShopItem[]): void {
    this.stripe.redirectToCheckout(itemsInCart);
  }
}
