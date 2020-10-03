import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseAppConfig } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ShopItem } from 'src/app/core/models/Product';
import * as firebase from 'firebase';
import { map, share } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { LogService } from '../log/log.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public availableDecks: Observable<ShopItem[]> | Observable<unknown[]> = of(
    []
  );

  constructor(private firestore: AngularFirestore, private log: LogService) {
    // TODO: Error handle
    this.availableDecks = this.firestore
      .collection('decks', (ref) => ref.orderBy('id'))
      .valueChanges({ idField: 'firebase_doc_id' });
  }

  /**
   * Remove from cart and mark as sold in firestore.
   * @param itemStripeIds - stripe_id's for prices
   */
  markItemsAsSold(itemStripeIds: string[], items: ShopItem[]): void {
    itemStripeIds.forEach((stripeId) => {
      const firestoreId = items.find((i) => i.stripe_id === stripeId)
        ?.firebase_doc_id;

      if (!!firestoreId) {
        this.firestore
          .collection('decks')
          .doc('/' + firestoreId)
          .update({ sold: true })
          .then(() => {
            this.log.logDebug(
              `Updated firebase document ${firestoreId}, set sold = true`
            );
          })
          .catch((error) => {
            this.log.logError(
              'updating firebase document',
              'markItemsAsSold()'
            );
            console.log(error);
          });
      } else {
        this.log.logDebug(
          'Could not find firestore id from stripe id, no update was performed'
        );
      }
    });
  }
}
