import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ShopItem } from '../../models/Product';

@Component({
  templateUrl: './shopping-container.component.html',
  styleUrls: ['./shopping-container.component.scss'],
})
export class ShoppingContainerComponent implements OnInit {
  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.availableDecks;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {}
}
