import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingContainerComponent } from './core/containers/landing-container/landing-container.component';
import { ShoppingContainerComponent } from './core/containers/shopping-container/shopping-container.component';
import { AboutContainerComponent } from './core/containers/about-container/about-container.component';
import { ContactContainerComponent } from './core/containers/contact-container/contact-container.component';
import { SuccessContainerComponent } from './core/containers/success-container/success-container.component';
import { CancelledContainerComponent } from './core/containers/cancelled-container/cancelled-container.component';
import { CanActivateGuard } from './shared/guards/can-activate.guard';
import { SiteLockGuard } from './shared/guards/site-lock.guard';
import { CartContainerComponent } from './core/containers/cart-container/cart-container.component';

const routes: Routes = [
  {
    path: '',
    component: LandingContainerComponent,
  },
  {
    path: 'cart',
    component: CartContainerComponent,
    canActivate: [SiteLockGuard],
  },
  {
    path: 'shop',
    component: ShoppingContainerComponent,
    canActivate: [SiteLockGuard],
  },
  {
    path: 'about',
    component: AboutContainerComponent,
    canActivate: [SiteLockGuard],
  },
  {
    path: 'contact',
    component: ContactContainerComponent,
    canActivate: [SiteLockGuard],
  },
  {
    path: 'success',
    component: SuccessContainerComponent,
    canActivate: [SiteLockGuard, CanActivateGuard],
  },
  {
    path: 'cancelled',
    component: CancelledContainerComponent,
    canActivate: [SiteLockGuard, CanActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
