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
import { LandingContainerComponent } from './core/components/landing-container/landing-container.component';
import { LandingTopVideoComponent } from './core/components/landing-top-video/landing-top-video.component';
import { LandingBottomComponent } from './core/components/landing-bottom/landing-bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingContainerComponent,
    LandingTopVideoComponent,
    LandingBottomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
