import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { mapStyles } from '../../theme/mapStyles';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FetchCoords } from '../../store/user/user.actions';
import { RentalSearchPage } from '../rental-search/rental-search';
import { Place } from '../../shared/place';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const fakeStations: Place[] = [
  {
    address: '587 Eddy St, San Francisco, CA 94109',
    coords: {
      lat: 37.783207,
      lng: -122.417295
    }
  }
];

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {
  mapStyles = mapStyles;
  stations: Place[] = fakeStations;
  currentLocation: Observable<google.maps.LatLngLiteral>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.currentLocation = this.store.select('user', 'currentLocation', 'coords');
    this.store.dispatch(new FetchCoords());
  }

  searchFromStation(index: number) {
    this.navCtrl.setRoot(RentalSearchPage, {station: this.stations[index]})
  }
}
