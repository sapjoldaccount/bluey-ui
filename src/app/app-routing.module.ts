import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingContainerComponent } from './core/components/landing-container/landing-container.component';
import { ShoppingContainerComponent } from './shopping/components/shopping-container/shopping-container.component';

const routes: Routes = [
  {
    path: '',
    component: LandingContainerComponent
  },
  {
    path: 'shop',
    component: ShoppingContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
