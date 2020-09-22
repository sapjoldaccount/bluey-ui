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

  spinnerAction = new BehaviorSubject<string>(null);
  spinnerAction$ = this.spinnerAction.asObservable();

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

  updateSpinnerStatus(spinnerAction: string): void {
    this.spinnerAction.next(spinnerAction);
  }

  itemIsInCart(product: ShopItem, inCartItems: ShopItem[]): boolean {
    return inCartItems?.map((p) => p?.id)?.includes(product?.id);
  }

  initializeCart(): void {
    let currentShopItems = [];

    this.storage
      .get(CART_ITEMS_KEY)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(
        (data: ShopItem[]) => {
          if (!!data) {
            currentShopItems = [...data];
          }
        },
        (error) => {
          this.logger.error('An error occurred.');
        },
        () => {
          this.logger.debug('Initialized local storage.');
          this.storage.set(CART_ITEMS_KEY, currentShopItems).subscribe();
        }
      );
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
            // location.reload();
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
            // location.reload();
          }
        );
    }, 350);
  }
}
