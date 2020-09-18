import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ShopItem } from '../../models/Product';
import { CDN_BASE_URL } from '../../../core/consts/cdn.consts';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../services/cart/cart.service';
@Component({
  templateUrl: './shopping-container.component.html',
  styleUrls: ['./shopping-container.component.scss'],
})
export class ShoppingContainerComponent implements OnInit {
  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.availableDecks;

  adding$: Observable<boolean> = this.cart.adding$;

  // TODO: MOVE TO ENVIRONMENT SERVICE
  cdnBaseUrl = CDN_BASE_URL;

  // animate to remove item
  // header bar color - ICON
  // font stuff
  // bold add to cart text or color darken maybe navy or same blue

  // #BDBDFF
  constructor(
    private firestoreService: FirestoreService,
    private spinner: NgxSpinnerService,
    private cart: CartService
  ) {}

  ngOnInit(): void {}
}
