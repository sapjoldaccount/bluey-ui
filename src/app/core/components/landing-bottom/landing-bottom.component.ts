import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { LogService } from 'src/app/shared/services/log/log.service';
import { CDN_BASE_URL } from '../../consts/cdn.consts';
import { ShopItem } from '../../models/Product';

@Component({
  selector: 'app-landing-bottom',
  templateUrl: './landing-bottom.component.html',
  styleUrls: ['./landing-bottom.component.scss'],
})
export class LandingBottomComponent implements OnInit {
  cdnBaseUrl = CDN_BASE_URL;

  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.availableDecks;

  constructor(
    private firestoreService: FirestoreService,
    private log: LogService
  ) {}

  ngOnInit(): void {}
}
