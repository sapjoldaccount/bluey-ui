import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CartService } from '../../services/cart/cart.service';
import { RoutingService } from '../../services/routing/routing.service';

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
    private router: Router,
    private cart: CartService,
    private routingService: RoutingService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.routingService.detectActiveRoute();
  }

  scrollToTop(fromBadge?: true): void {
    window.scrollTo(0, 0);
    if (fromBadge) {
      this.router.navigateByUrl('/cart');
    }
  }
}
