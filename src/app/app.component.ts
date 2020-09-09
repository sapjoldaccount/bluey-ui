import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CartService } from './core/services/cart/cart.service';
import { ResponsiveService } from './shared/services/responsive/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'skate';

  // users: Observable<any[]>;

  constructor(
    firestore: AngularFirestore,
    private shoppingCartService: CartService,
    private responsiveService: ResponsiveService
    ) {
    // this.users = firestore.collection('users').valueChanges();
  }

  ngOnInit(): void {
    this.responsiveService.detectScreenSizeChange();
  }

  addTest(): void {
    this.shoppingCartService.addProduct(null);
  }

  deleteTest(): void {
    this.shoppingCartService.deleteProduct(null);
  }
}
