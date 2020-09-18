import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  productsInCart$ = this.cart.productsInCart$;

  constructor(private cart: CartService, public modalRef: MDBModalRef) {}

  ngOnInit(): void {}
}
