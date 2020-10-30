import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { environment } from 'src/environments/environment';
import { ShopItem } from '../../models/ShopItem';

@Component({
  selector: 'app-landing-bottom',
  templateUrl: './landing-bottom.component.html',
  styleUrls: ['./landing-bottom.component.scss'],
})
export class LandingBottomComponent implements OnInit {
  cdnBaseUrl = environment.cdnBaseUrl;

  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.allShopItems;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {}
}
