import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { CDN_BASE_URL } from '../../consts/cdn.consts';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  productsInCart$ = this.cart.productsInCart$;

  cartTotal$: Observable<number> = this.productsInCart$.pipe(
    map(
      (products) =>
        Math.round(
          products.map((p) => p.price).reduce((a, b) => a + b, 0) * 100
        ) / 100
    )
  );

  cdnBaseUrl = CDN_BASE_URL;

  constructor(
    private cart: CartService,
    public modalRef: MDBModalRef,
    private stripe: StripeService,
    private spinnerService: SpinnerService
  ) {}

  onCheckoutClick(itemsInCart: ShopItem[]): void {
    this.stripe.redirectToCheckout(itemsInCart);
  }

  ngOnInit(): void {}

  removeItemFromCart(item: ShopItem): void {
    this.spinnerService.updateSpinnerStatus('removing');
    this.cart.removeShopItemFromCart(item.id);
  }
}
