import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripData } from '../../shared/tripData/tripData';
import { fakeResult } from '../../store/search/fakeResult';
import { TripDetailPage } from '../trip-detail/trip-detail';
import { fakeTrips } from '../../store/search/fakeTrips';

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  time = 'upcoming';
  trips: { upcoming: TripData[], past: TripData[] };
  get tripsToShow() {
    return this.trips[this.time];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trips = fakeTrips;
  }

  onTripClicked($event) {
    this.navCtrl.push(TripDetailPage, {trip: $event})
  }

}
