import { Injectable, OnDestroy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogService } from 'src/app/shared/services/log/log.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CART_ITEMS_KEY } from '../../consts/storage.consts';
import { ShopItem } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  productsInCart$: Observable<ShopItem[]> = of([]);

  ngUnsub = new Subject();

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  constructor(
    private log: LogService,
    private storage: StorageMap,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {
    // Initialize observable to watch local storage and update accordingly
    this.productsInCart$ =
      (this.storage.watch(CART_ITEMS_KEY) as Observable<ShopItem[]>) ?? of([]);
  }

  /* -------------------------------------------------------------------------- */
  /*                                CART ACTIONS                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Empty cart (only called on successful order)
   */
  emptyCart(): void {
    const currentShopItems = [];

    this.storage
      .get(CART_ITEMS_KEY)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(
        (data: ShopItem[]) => {},
        (error) => {
          this.log.logError('emptying cart', 'emptyCart()');
        },
        () => {
          this.log.logDebug('Emptied local storage successfully.');
          this.storage.set(CART_ITEMS_KEY, currentShopItems).subscribe();
        }
      );
  }

  /**
   * On first site load, initialize cart in indexedDb storage
   */
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
          this.log.logError('initializing cart', 'initializeCart()');
        },
        () => {
          this.log.logDebug('Initialized local storage successfully.');
          this.storage.set(CART_ITEMS_KEY, currentShopItems).subscribe();
        }
      );
  }

  /**
   * Add item to cart
   * @param product - Product object to add to local storage
   * and corresponding observable that listens to local storage
   */
  addShopItem(product: ShopItem): void {
    this.spinner.show();

    // Show spinner for 350ms for aesthetic purposes
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
            this.log.logError('adding item to cart', 'addShopItem()');
          },
          () => {
            this.log.logDebug('Added product to local storage successfully.');
            this.storage.set(CART_ITEMS_KEY, updatedShopItems).subscribe();
          }
        );
    }, 350);
  }

  /**
   * Remove item from cart
   * @param toRemoveId - remove item from cart based on numeric id
   */
  removeShopItemFromCart(toRemoveId: number): void {
    this.spinner.show();

    // Show spinner for 350ms for aesthetic purposes
    setTimeout(() => {
      this.spinner.hide();
      let updatedShopItems = [];
      this.storage
        .get(CART_ITEMS_KEY)
        .pipe(takeUntil(this.ngUnsub))
        .subscribe(
          (data: ShopItem[]) => {
            if (!!data) {
              updatedShopItems = data.filter((d) => d?.id !== toRemoveId);
            }
          },
          (error) => {
            this.log.logError(
              'removing item from cart',
              'removeShopItemFromCart()'
            );
          },
          () => {
            this.log.logDebug(
              'Removed product from local storage succesfully.'
            );
            this.storage.set(CART_ITEMS_KEY, updatedShopItems).subscribe();
          }
        );
    }, 350);
  }

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */

  /**
   * Check if item is in cart
   * @param product - product you want to check
   * @param inCartItems - items in cart currently
   */
  itemIsInCart(product: ShopItem, inCartItems: ShopItem[]): boolean {
    return inCartItems?.map((p) => p?.id)?.includes(product?.id);
  }
}
