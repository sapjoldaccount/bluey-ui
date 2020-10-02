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
import { StripeService } from 'src/app/core/services/stripe/stripe.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(private stripe: StripeService, private router: Router) {}

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
          if (!!s) {
            return true;
          }

          this.router.navigateByUrl('/');
          return false;
        })
      );
  }
}
