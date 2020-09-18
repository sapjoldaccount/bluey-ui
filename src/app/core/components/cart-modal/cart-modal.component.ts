import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CDN_BASE_URL } from '../../consts/cdn.consts';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  // @ViewChild('cartModal') private cartScrollContainer: ElementRef;
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

  constructor(private cart: CartService, public modalRef: MDBModalRef) {}

  ngOnInit(): void {
    // this.cartScrollContainer.nativeElement.scrollTop = this.cartScrollContainer.nativeElement.scrollHeight;
  }

  removeItemFromCart(item: ShopItem): void {
    this.cart.removeShopItemFromCart(item.id);
  }
}
