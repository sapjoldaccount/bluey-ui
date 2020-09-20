import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BehaviorSubject } from 'rxjs';
import { CDN_BASE_URL } from '../../consts/cdn.consts';
import { ShopItem } from '../../models/Product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})
export class ProductDetailModalComponent implements OnInit {
  cdnBaseUrl = CDN_BASE_URL;

  content: {
    title: string;
    id: number;
    productObject: ShopItem;
  };

  // TODO: centralize! stop duping code
  isInCart = new BehaviorSubject(false);
  isInCart$ = this.isInCart.asObservable();

  constructor(public modalRef: MDBModalRef, private cart: CartService) {}

  ngOnInit(): void {
    this.isInCart$.subscribe((a) => console.log(a));
    this.cart.productsInCart$.subscribe((a) => console.log(a));
    console.log(this.content.productObject);
    // TODO: CENTRALIZE THIS, you're getting sloppy steve...
    this.cart.productsInCart$.subscribe((products) => {
      this.isInCart.next(
        this.cart.itemIsInCart(this.content.productObject, products)
      );
    });
  }

  addToCartClicked(): void {}

  removeFromCartClicked(): void {}
}
