import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './core/components/footer/footer.component';
import { LandingTopVideoComponent } from './core/components/landing-top-video/landing-top-video.component';
import { LandingBottomComponent } from './core/components/landing-bottom/landing-bottom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShoppingContainerComponent } from './core/containers/shopping-container/shopping-container.component';
import { LandingContainerComponent } from './core/containers/landing-container/landing-container.component';
import { AboutContainerComponent } from './core/containers/about-container/about-container.component';
import { ContactContainerComponent } from './core/containers/contact-container/contact-container.component';
import { ProductPreviewComponent } from './core/components/product-preview/product-preview.component';
import { RouterLinkActive } from '@angular/router';
import { ShopItemCardComponent } from './core/components/shop-item-card/shop-item-card.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartModalComponent } from './core/components/cart-modal/cart-modal.component';
import { ProductDetailModalComponent } from './core/components/product-detail-modal/product-detail-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessContainerComponent } from './core/containers/success-container/success-container.component';
import { CancelledContainerComponent } from './core/containers/cancelled-container/cancelled-container.component';
import { CustomDeckModalComponent } from './core/components/custom-deck-modal/custom-deck-modal/custom-deck-modal.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorSwatchesModule } from 'ngx-color/swatches'; // <color-swatches></color-swatches>

import { ColorCircleModule } from 'ngx-color/circle';
import { ConfirmationModalComponent } from './core/components/confirmation-modal/confirmation-modal.component'; // <color-circle></color-circle>

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingContainerComponent,
    LandingTopVideoComponent,
    LandingBottomComponent,
    ShoppingContainerComponent,
    AboutContainerComponent,
    ContactContainerComponent,
    ProductPreviewComponent,
    ShopItemCardComponent,
    CartModalComponent,
    ProductDetailModalComponent,
    SuccessContainerComponent,
    CancelledContainerComponent,
    CustomDeckModalComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    ColorSketchModule,
    ColorCircleModule,
    ColorSwatchesModule,
    MatCheckboxModule,
    CommonModule,
    AppRoutingModule,
    MatBadgeModule,
    NgxSpinnerModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    LayoutModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),
    AngularFireModule.initializeApp(environment.firebase),
    MDBBootstrapModule.forRoot(),
  ],
  providers: [RouterLinkActive],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CartModalComponent],
})
export class AppModule {}
