import { Injectable, OnDestroy } from '@angular/core';
import { Observable, combineLatest, of, BehaviorSubject, Subject } from 'rxjs';
import { ShopItem } from '../../models/Product';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CART_ITEMS_KEY } from '../../consts/storage.consts';
import { NGXLogger } from 'ngx-logger';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  productsInCart$: Observable<ShopItem[]> = of([]);

  ngUnsub = new Subject();

  // Adding to cart aesthetic animation
  // addingToCart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // addingToCart$: Observable<boolean> = this.addingToCart.asObservable();

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  constructor(private logger: NGXLogger, private storage: StorageMap) {
    this.productsInCart$ =
      (this.storage.watch(CART_ITEMS_KEY) as Observable<ShopItem[]>) ?? of([]);
  }

  addShopItem(product: ShopItem): void {
    let updatedShopItems = [product];
    this.storage
      .get(CART_ITEMS_KEY)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(
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

  removeShopItemFromCart(toRemoveId: number) {
    let updatedShopItems = [];
    this.storage
      .get(CART_ITEMS_KEY)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(
        (data: ShopItem[]) => {
          if (!!data) {
            updatedShopItems = data.filter((d) => d.id !== toRemoveId);
          }
        },
        (error) => {
          this.logger.error('An error occurred.');
        },
        () => {
          this.logger.debug('Removed product from local storage.');
          this.storage.set(CART_ITEMS_KEY, updatedShopItems).subscribe();
        }
      );
  }
}
