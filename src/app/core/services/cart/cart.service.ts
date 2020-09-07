import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/Product';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CART_ITEMS_KEY } from '../../consts/storage.consts';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class CartService {
  productsInCart$: Observable<Product[]>;

  constructor(
    private logger: NGXLogger,
    private storage: StorageMap) {
      this.productsInCart$ = this.storage.watch(CART_ITEMS_KEY) as Observable<Product[]>;
  }

  addProduct(product: Product): void {

    product = {
      title: 'Test',
      price: 1,
      image: 'test'
    };

    let updatedProducts = [product];

    this.storage.get(CART_ITEMS_KEY).subscribe(
      (data: Product[]) => {
        if (!!data) {
          updatedProducts = [...data, product];
        }
      },
      (error) => {
        this.logger.error('An error occurred.');
      },
      () => {
        this.logger.debug('Added product to local storage.');
        this.storage.set(CART_ITEMS_KEY, updatedProducts).subscribe();
      }
    );
  }

  deleteProduct(product: Product): void {
  }
}

