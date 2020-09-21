import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseAppConfig } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ShopItem } from 'src/app/core/models/Product';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public availableDecks: Observable<ShopItem[]> | Observable<unknown[]> = of(
    []
  );

  // TODO: Loading spinner

  constructor(private firestore: AngularFirestore) {
    // TODO: Error handle
    this.availableDecks = this.firestore.collection('decks').valueChanges();
  }
}
