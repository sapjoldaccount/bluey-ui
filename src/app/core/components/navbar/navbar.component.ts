import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ScreenSize } from '../../../shared/enums/screen-size.enum';
import { RoutingService } from '../../services/routing/routing.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  modalRef: MDBModalRef;

  productsInCart$ = this.cart.productsInCart$;

  screenSize$ = this.responsiveService.screenSize$;
  isSmall$ = this.responsiveService.isSmall$;
  screenSizes = ScreenSize;

  activeRoute$ = this.routingService.activeRoute$;

  constructor(
    private cart: CartService,
    private responsiveService: ResponsiveService,
    private routingService: RoutingService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.routingService.detectActiveRoute();
  }

  openCartModal() {
    this.modalRef = this.modalService.show(CartModalComponent);
  }
}
