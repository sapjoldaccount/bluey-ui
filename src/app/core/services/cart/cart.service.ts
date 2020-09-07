import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';
import { StorageMap } from '@ngx-pwa/local-storage';

// TODO: Make separate data service for getting available products
const initialData: Product[] = [];


@Injectable({
    providedIn: 'root'
})
export class CartService {
  private model: Model<Product[]>;

  products$: Observable<Product[]>;

  constructor(
    private modelFactory: ModelFactory<Product[]>,
    private storage: StorageMap) {

    this.model = this.modelFactory.create(initialData);
    this.products$ = this.model.data$;

    // Example code of accessing storage
    // let user: any = { firstName: 'Henri', lastName: 'Bergson' };
    // this.storage.set('user', user).subscribe(() => {});

    // this.storage.get('user').subscribe((user) => {
    //   console.log(user);
    // });
  }

  addProduct(product: Product): void {
    const products = this.model.get();

    products.push(product);

    this.model.set(products);
  }
}

