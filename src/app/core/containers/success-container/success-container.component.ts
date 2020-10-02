import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  templateUrl: './success-container.component.html',
  styleUrls: ['./success-container.component.scss'],
})
export class SuccessContainerComponent implements OnInit {
  constructor(
    private stripeService: StripeService,
    private activatedRoute: ActivatedRoute,
    private firestore: FirestoreService // private route: ActivatedRouteSnapshot, // private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(filter((params) => !!params['itemPurchased']))
      .subscribe((params) => {
        const itemsToRemove = params['itemPurchased'];
        this.firestore.markItemsAsSold(itemsToRemove);
      });
  }
}
