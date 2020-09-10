import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
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
    ProductPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    AngularFireModule.initializeApp(environment.firebase),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
