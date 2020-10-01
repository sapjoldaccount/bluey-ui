import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingContainerComponent } from './core/containers/landing-container/landing-container.component';
import { ShoppingContainerComponent } from './core/containers/shopping-container/shopping-container.component';
import { AboutContainerComponent } from './core/containers/about-container/about-container.component';
import { ContactContainerComponent } from './core/containers/contact-container/contact-container.component';
import { ViewCartContainerComponent } from './core/containers/view-cart-container/view-cart-container.component';
import { SuccessContainerComponent } from './core/containers/success-container/success-container.component';
import { CancelledContainerComponent } from './core/containers/cancelled-container/cancelled-container.component';

const routes: Routes = [
  {
    path: '',
    component: LandingContainerComponent,
  },
  {
    path: 'shop',
    component: ShoppingContainerComponent,
  },
  {
    path: 'about',
    component: AboutContainerComponent,
  },
  {
    path: 'contact',
    component: ContactContainerComponent,
  },
  {
    path: 'cart',
    component: ViewCartContainerComponent,
  },
  {
    path: 'success',
    component: SuccessContainerComponent,
  },
  {
    path: 'cancelled',
    component: CancelledContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
