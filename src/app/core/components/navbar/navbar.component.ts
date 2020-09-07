import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  productsInCart$ = this.shoppingCartService.productsInCart$;

  constructor(private shoppingCartService: CartService) { }

  ngOnInit(): void {
  }

}
