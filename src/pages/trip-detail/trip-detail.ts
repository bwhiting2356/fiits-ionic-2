import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { TripData } from '../../shared/tripData/tripData';

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html',
})
export class TripDetailPage {
  trip: TripData;
  bounds: google.maps.LatLngBounds;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mapsAPILoader: MapsAPILoader) {
    this.trip = this.navParams.get('trip')
    this.mapsAPILoader.load().then(() => {
      this.bounds = new google.maps.LatLngBounds()
      this.bounds.extend(this.trip.origin.coords);
      this.bounds.extend(this.trip.destination.coords);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailPage');
  }

}
