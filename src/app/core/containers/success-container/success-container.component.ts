import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  templateUrl: './success-container.component.html',
  styleUrls: ['./success-container.component.scss'],
})
export class SuccessContainerComponent implements OnInit {
  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {}
}
