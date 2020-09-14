import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';
import { ShopItem } from '../../models/Product';
import { CDN_BASE_URL } from '../../../core/consts/cdn.consts';
@Component({
  templateUrl: './shopping-container.component.html',
  styleUrls: ['./shopping-container.component.scss'],
})
export class ShoppingContainerComponent implements OnInit {
  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.availableDecks;

  // TODO: MOVE TO ENVIRONMENT SERVICE
  cdnBaseUrl = CDN_BASE_URL;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {}
}
