import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from '../../services/stripe/stripe.service';

@Component({
  templateUrl: './success-container.component.html',
  styleUrls: ['./success-container.component.scss'],
})
export class SuccessContainerComponent implements OnInit {
  constructor(
    private stripeService: StripeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   const userId = params['session_id'];
    //   console.log(userId);
    // });
  }
}
