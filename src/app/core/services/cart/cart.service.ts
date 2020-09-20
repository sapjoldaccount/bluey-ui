import { Injectable, OnDestroy } from '@angular/core';
import { Observable, combineLatest, of, BehaviorSubject, Subject } from 'rxjs';
import { ShopItem } from '../../models/Product';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CART_ITEMS_KEY } from '../../consts/storage.consts';
import { NGXLogger } from 'ngx-logger';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  productsInCart$: Observable<ShopItem[]> = of([]);

  adding = new BehaviorSubject<boolean>(false);
  adding$ = this.adding.asObservable();

  ngUnsub = new Subject();

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  constructor(
    private logger: NGXLogger,
    private storage: StorageMap,
    private spinner: NgxSpinnerService
  ) {
    this.productsInCart$ =
      (this.storage.watch(CART_ITEMS_KEY) as Observable<ShopItem[]>) ?? of([]);
  }

  updateSpinnerStatus(addingToCart: boolean) {
    this.adding.next(addingToCart);
  }

  addShopItem(product: ShopItem): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
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
    }, 350);
  }

  removeShopItemFromCart(toRemoveId: number): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
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
    }, 350);
  }
}
