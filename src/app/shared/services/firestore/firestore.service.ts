import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseAppConfig } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ShopItem } from 'src/app/core/models/Product';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public availableDecks: Observable<ShopItem[]> | Observable<unknown[]> = of(
    []
  );

  // TODO: Loading spinner

  constructor(private firestore: AngularFirestore, private cart: CartService) {
    // TODO: Error handle
    this.availableDecks = this.firestore
      .collection('decks', (ref) => ref.orderBy('id'))
      .valueChanges({ idField: 'firebase_doc_id' });
  }

  /**
   * Remove from cart and mark as sold in firestore.
   * @param itemStripeIds - stripe_id's for prices
   */
  markItemsAsSold(itemStripeIds: string[]) {
    this.cart.emptyCart();
    itemStripeIds.forEach((id) => {
      // TODO: mark items as sold in Firestore
    });
  }
}
