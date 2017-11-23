import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RentalSearchPage } from '../pages/rental-search/rental-search';
import { MapPage } from '../pages/map/map';
import { TripsPage } from '../pages/trips/trips';
import { AuthService } from '../services/auth.service';
import { PaymentPage } from '../pages/payment/payment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;

  rootPage:any = RentalSearchPage;
  rentalSearchPage:any = RentalSearchPage;
  tripsPage:any = TripsPage;
  paymentPage:any = PaymentPage;
  mapPage:any = MapPage;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: AuthService,
              private toastCtrl: ToastController) {
    this.authService.handleAuthentication();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogIn() {
    this.authService.login();
  }

  onLogout() {
    this.menuCtrl.close().then(() => {
      this.authService.logout();
      let toast = this.toastCtrl.create({
        message: 'You are now logged out',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

