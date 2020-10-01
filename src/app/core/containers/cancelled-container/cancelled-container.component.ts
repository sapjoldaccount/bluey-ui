import { Component, OnInit } from '@angular/core';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  templateUrl: './cancelled-container.component.html',
  styleUrls: ['./cancelled-container.component.scss'],
})
export class CancelledContainerComponent implements OnInit {
  productsInCart$ = this.cart.productsInCart$;

  constructor(private cart: CartService, private stripe: StripeService) {}

  ngOnInit(): void {}

  goBackToCheckout(itemsInCart: ShopItem[]): void {
    this.stripe.redirectToCheckout(itemsInCart);
  }
}
