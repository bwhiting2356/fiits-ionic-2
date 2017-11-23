import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { mapStyles } from '../../theme/mapStyles';
import { AppState } from "../../store/reducer";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TripData } from '../../shared/tripData/tripData';
import { AgmMap } from '@agm/core';


@Component({
  selector: 'page-rental-search-result',
  templateUrl: 'rental-search-result.html',
})
export class RentalSearchResultPage implements OnInit {
  @ViewChild(AgmMap) myMap: AgmMap;

  result: Observable<TripData>;
  bounds: Observable<google.maps.LatLngBounds>;
  mapStyles = mapStyles;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.result = this.store.select('search', 'result');
    this.bounds = this.store.select('search', 'result').map(result => {
      let bounds = new google.maps.LatLngBounds();
      bounds.extend(result.destination.coords);
      bounds.extend(result.origin.coords);

      return bounds;
    });
  }

}
