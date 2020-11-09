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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

/* -------------------------------------------------------------------------- */
/*                              SITE LOCK GUARD                               */
/* -------------------------------------------------------------------------- */
/*                             USED FOR ALL PAGES                             */
/* -------------------------------------------------------------------------- */
export class SiteLockGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (environment.lockEntireSite) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
