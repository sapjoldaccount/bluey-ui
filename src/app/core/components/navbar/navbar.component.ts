import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CartService } from '../../services/cart/cart.service';
import { RoutingService } from '../../services/routing/routing.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                                   NAVBAR                                   */
/* -------------------------------------------------------------------------- */
export class NavbarComponent implements OnInit {
  modalRef: MDBModalRef;

  productsInCart$ = this.cart.productsInCart$;
  activeRoute$ = this.routingService.activeRoute$;

  constructor(
    private cart: CartService,
    private routingService: RoutingService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.routingService.detectActiveRoute();
  }

  /**
   * Open the cart containing items, price, checkout button
   */
  openCartModal(): void {
    this.modalRef = this.modalService.show(CartModalComponent);
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo(0, 0);
  }
}
