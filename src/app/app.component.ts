import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShopItem } from './core/models/ShopItem';
import { CartService } from './core/services/cart/cart.service';
import { FirestoreService } from './shared/services/firestore/firestore.service';
import { LogService } from './shared/services/log/log.service';
import { ResponsiveService } from './shared/services/responsive/responsive.service';
import { SpinnerService } from './shared/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'skate';

  spinnerAction$: Observable<string> = this.spinnerService.spinnerAction$;

  availableDecks$: Observable<ShopItem[]> | Observable<unknown[]> = this
    .firestoreService.allShopItems;

  lockSite: boolean = environment.lockEntireSite;

  constructor(
    private shoppingCartService: CartService,
    private spinnerService: SpinnerService,
    private responsiveService: ResponsiveService,
    private spinner: NgxSpinnerService,
    private firestoreService: FirestoreService,
    private storage: StorageMap,
    private router: Router,
    private log: LogService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.initializeCart();
    this.responsiveService.detectScreenSizeChange();

    this.availableDecks$.subscribe((decks) => {
      this.log.logDebug('Current available decks from Firestore:');
      console.log(decks);
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
