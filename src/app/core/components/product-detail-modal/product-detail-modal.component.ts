import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CDN_BASE_URL } from '../../consts/cdn.consts';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                            PRODUCT DETAIL MODAL                            */
/* -------------------------------------------------------------------------- */
/*                    OPENED WHEN PRODUCT IMAGE IS CLICKED                    */
/* -------------------------------------------------------------------------- */
export class ProductDetailModalComponent implements OnInit, OnDestroy {
  // For subscription destroy
  ngUnsub = new Subject();

  cdnBaseUrl = environment.cdnBaseUrl;

  /**
   * Content passed in from opener
   */
  content: {
    title: string;
    id: number;
    productObject: ShopItem;
  };

  isInCart = new BehaviorSubject(false);
  isInCart$ = this.isInCart.asObservable();

  constructor(public modalRef: MDBModalRef, private cart: CartService) {}

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  ngOnInit(): void {
    // Let modal know if current item is in cart
    this.cart.productsInCart$
      .pipe(takeUntil(this.ngUnsub))
      .subscribe((products) => {
        this.isInCart.next(
          this.cart.itemIsInCart(this.content.productObject, products)
        );
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                CART ACTIONS                                */
  /* -------------------------------------------------------------------------- */

  addToCartClicked(product: ShopItem): void {
    this.cart.addShopItem(product);
  }

  removeFromCartClicked(product: ShopItem): void {
    this.cart.removeShopItemFromCart(product.id);
  }
}
