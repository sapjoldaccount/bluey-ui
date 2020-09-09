import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ScreenSize } from '../../../shared/enums/screen-size.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  productsInCart$ = this.shoppingCartService.productsInCart$;

  screenSize$ = this.responsiveService.screenSize$;
  screenSizes = ScreenSize;

  constructor(private shoppingCartService: CartService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
  }

}
