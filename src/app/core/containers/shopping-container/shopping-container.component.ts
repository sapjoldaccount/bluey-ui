import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { environment } from 'src/environments/environment';
import { ShopItem } from '../../models/ShopItem';
import { CartService } from '../../services/cart/cart.service';
@Component({
  templateUrl: './shopping-container.component.html',
  styleUrls: ['./shopping-container.component.scss'],
})

/* -------------------------------------------------------------------------- */
/*                                  SHOP PAGE                                 */
/* -------------------------------------------------------------------------- */
export class ShoppingContainerComponent implements OnInit {
  // All decks stored in Firestore
  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.allShopItems;

  customDeckItem$: Observable<ShopItem> | Observable<unknown> = this
    .firestoreService.customDeckItem;

  spinnerAction$: Observable<string> = this.spinnerService.spinnerAction$;

  cdnBaseUrl = environment.cdnBaseUrl;

  constructor(
    private firestoreService: FirestoreService,
    private cart: CartService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}
}
