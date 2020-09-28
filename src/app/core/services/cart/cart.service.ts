import { Injectable, OnDestroy } from '@angular/core';
import { Observable, combineLatest, of, BehaviorSubject, Subject } from 'rxjs';
import { ShopItem } from '../../models/Product';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CART_ITEMS_KEY } from '../../consts/storage.consts';
import { NGXLogger } from 'ngx-logger';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LogService } from 'src/app/shared/services/log/log.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  productsInCart$: Observable<ShopItem[]> = of([]);

  spinnerAction = new BehaviorSubject<string>(null);
  spinnerAction$ = this.spinnerAction.asObservable();

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
          this.log.logError('initializing cart', 'initializeCart()');
        },
        () => {
          this.log.logDebug('Initialized local storage successfully.');
          this.storage.set(CART_ITEMS_KEY, currentShopItems).subscribe();
        }
      );
  }

  addShopItem(product: ShopItem): void {
    this.spinner.show();
    setTimeout(() => {
      this.toastService.showAddedToCart();
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
}
