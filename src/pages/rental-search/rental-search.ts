import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { RentalSearchInputPage } from '../rental-search-input/rental-search-input';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/startWith';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';

import { FetchCoords } from '../../store/user/user.actions';
import { MapsAPILoader } from '@agm/core';
import { RentalSearchResultPage } from '../rental-search-result/rental-search-result';
import {
  DestinationChange,
  DestinationCoordsReceived,
  OriginChange, OriginCoordsReceived, Search, TimeChange,
  TimeTargetChange
} from '../../store/search/search.actions';
import { SearchQuery } from '../../shared/searchQuery';

import { mapStyles } from '../../theme/mapStyles';
import { Coords } from '../../shared/coords';


@Component({
  selector: 'page-rental-search',
  templateUrl: 'rental-search.html',
})
export class RentalSearchPage implements OnInit {
  mapStyles = mapStyles;
  currentLocation: Observable<google.maps.LatLngLiteral>;
  fetchingAddress: Observable<boolean>;

  // origin, destination coords for markers
  originCoords: Observable<google.maps.LatLngLiteral>;
  destinationCoords: Observable<google.maps.LatLngLiteral>;
  bounds: Observable<google.maps.LatLngBounds>;

  // search query fields
  origin: Observable<string>;
  destination: Observable<string>;
  timeTarget: Observable<string>;
  time: Observable<Date>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private mapsAPILoader: MapsAPILoader,
              private store: Store<AppState>,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.mapsAPILoader.load().then(() => {
      this.bounds = this.store.select('search').map(search => {
        let bounds = new google.maps.LatLngBounds();
        if (search.originCoords) {
          bounds.extend(search.originCoords);
        }
        if (search.destinationCoords) {
          bounds.extend(search.destinationCoords);
        }
        return bounds;
      });
      loading.dismiss();
    }); // TODO: maybe I should load the google maps api during the splash screen or something then I won't have to do this
  }

  ngOnInit() {
    let station = this.navParams.get('station');
    if (station) {
      this.store.dispatch(new OriginChange(station.address))
      this.store.dispatch(new OriginCoordsReceived(station.coords))
    } else {
      this.store.dispatch(new FetchCoords());
    }

    this.currentLocation = this.store.select('user', 'currentLocation', 'coords');
    this.fetchingAddress = this.store.select('user', 'fetchingAddress');
    this.originCoords = this.store.select('search', 'originCoords');
    this.destinationCoords = this.store.select('search', 'destinationCoords');
    this.origin = this.store.select('search', 'query', 'origin');
    this.destination = this.store.select('search', 'query', 'destination');
    this.timeTarget = this.store.select('search', 'query', 'timeTarget');
    this.time = this.store.select('search', 'query', 'time');
  }

  openOriginModal($event) {
    $event.preventDefault();
    this.store.first().subscribe((store: AppState) => {
      if (!store.user.fetchingAddress) {
        const modal = this.modalCtrl.create(RentalSearchInputPage, {
          title: 'Origin',
          value: store.search.query.origin
        });
        modal.present();
        // modal.onDidDismiss(result => {
        //   if (result) {
        //     this.origin = result;
        //   }
        // })
      }
    });

  }

  openDestinationModal($event) {
    $event.preventDefault();
    this.store.first().subscribe((store: AppState) => {
      const modal = this.modalCtrl.create(RentalSearchInputPage, {
        title: 'Destination',
        value: store.search.query.destination
      });
      modal.present();
      modal.onDidDismiss(result => {
        if (result) {
          this.origin = result;
        }
      })
    });
  }

  onTimeChange($event) {
    this.store.dispatch(new TimeChange($event))
  }

  onTimeTargetChange($event) {
    this.store.dispatch(new TimeTargetChange($event))
  }

  rentalSearch(form: NgForm) {
    const query: SearchQuery = form.value;
    this.store.dispatch(new Search(query));
    this.navCtrl.push(RentalSearchResultPage);
  }

  switch() {
    this.store.first().subscribe(store => {
      const originAddress = store.search.query.origin;
      const destinationAddress = store.search.query.destination;
      const originCoords = store.search.originCoords;
      const destinationCoords = store.search.destinationCoords;
      this.store.dispatch(new OriginChange(destinationAddress));
      this.store.dispatch(new DestinationChange(originAddress));
      this.store.dispatch(new OriginCoordsReceived(destinationCoords));
      this.store.dispatch(new DestinationCoordsReceived(originCoords));
    })
  }
}
