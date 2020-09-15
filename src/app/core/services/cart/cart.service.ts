import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { ShopItem } from '../../models/Product';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CART_ITEMS_KEY } from '../../consts/storage.consts';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart$: Observable<ShopItem[]> = of([]);

  constructor(private logger: NGXLogger, private storage: StorageMap) {
    this.productsInCart$ =
      (this.storage.watch(CART_ITEMS_KEY) as Observable<ShopItem[]>) ?? of([]);
  }

  addShopItem(product: ShopItem): void {
    let updatedShopItems = [product];
    this.storage.get(CART_ITEMS_KEY).subscribe(
      (data: ShopItem[]) => {
        if (!!data) {
          updatedShopItems = [...data, product];
        }
      },
      (error) => {
        this.logger.error('An error occurred.');
      },
      () => {
        this.logger.debug('Added product to local storage.');
        this.storage.set(CART_ITEMS_KEY, updatedShopItems).subscribe();
      }
    );
  }
}
