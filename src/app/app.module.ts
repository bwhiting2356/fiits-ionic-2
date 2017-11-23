import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Keyboard } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { environment } from '../../environment/environment';

import { MyApp } from './app.component';

// Angular Google Maps

import { AgmCoreModule } from '@agm/core';
import { GMAP_KEY } from '../../environment/constants';

// Pages

import { RentalSearchPage } from '../pages/rental-search/rental-search';
import { RentalSearchInputPage } from "../pages/rental-search-input/rental-search-input";
import { RentalSearchResultPage } from '../pages/rental-search-result/rental-search-result';
import { MapPage } from '../pages/map/map';
import { PaymentPage } from '../pages/payment/payment';
import { PaymentMethodPage } from '../pages/payment/payment-method/payment-method';
import { AddMoneyPage } from '../pages/payment/add-money/add-money';
import { WithdrawMoneyPage } from '../pages/payment/withdraw-money/withdraw-money';
import { TripsPage } from '../pages/trips/trips';
import { TripDetailPage } from '../pages/trip-detail/trip-detail';

// Geolocation

import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationService } from '../services/geolocation.service';

// Ngrx

import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ComponentsModule } from '../components/components.module';
import { AuthService } from '../services/auth.service';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    RentalSearchPage,
    RentalSearchInputPage,
    RentalSearchResultPage,
    TripsPage,
    TripDetailPage,
    PaymentPage,
    PaymentMethodPage,
    AddMoneyPage,
    WithdrawMoneyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: GMAP_KEY,
      libraries: ['places']
    }),
    HttpClientModule,
    ComponentsModule,
    StoreModule.forRoot(reducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    RentalSearchPage,
    RentalSearchInputPage,
    RentalSearchResultPage,
    TripsPage,
    TripDetailPage,
    PaymentPage,
    PaymentMethodPage,
    AddMoneyPage,
    WithdrawMoneyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    Geolocation,
    GeolocationService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
