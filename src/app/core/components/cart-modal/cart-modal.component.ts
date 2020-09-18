import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { CDN_BASE_URL } from '../../consts/cdn.consts';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  productsInCart$ = this.cart.productsInCart$;

  cdnBaseUrl = CDN_BASE_URL;

  constructor(private cart: CartService, public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
