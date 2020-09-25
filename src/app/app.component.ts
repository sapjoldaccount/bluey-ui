import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { CART_ITEMS_KEY } from './core/consts/storage.consts';
import { CartService } from './core/services/cart/cart.service';
import { ResponsiveService } from './shared/services/responsive/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'skate';

  spinnerAction$: Observable<string> = this.shoppingCartService.spinnerAction$;

  constructor(
    private shoppingCartService: CartService,
    private responsiveService: ResponsiveService,
    private spinner: NgxSpinnerService,
    private storage: StorageMap,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.initializeCart();
    this.responsiveService.detectScreenSizeChange();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
