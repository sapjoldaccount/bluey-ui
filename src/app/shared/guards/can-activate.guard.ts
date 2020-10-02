import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SuccessContainerComponent } from 'src/app/core/containers/success-container/success-container.component';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private stripe: StripeService,
    private router: Router,
    private location: Location
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.stripe
      .retrieveCheckoutSession(next.queryParamMap.get('session_id'))
      .pipe(
        map((s) => {
          if (location.pathname === '/success' && !!s?.customer_details) {
            return true;
          }

          if (location.pathname === '/cancelled' && !!s) {
            return true;
          }

          this.router.navigateByUrl('/');
          return false;
        })
      );
  }
}
