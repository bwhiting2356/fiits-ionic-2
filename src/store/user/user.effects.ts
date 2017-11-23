import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  AddressReceived,
  CoordsReceived,
  FETCH_ADDRESS, FETCH_COORDS, FetchAddress, FetchCoords
} from './user.actions';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

import { MapsAPILoader } from '@agm/core';

import { GMAP_KEY } from '../../../environment/constants';
import { HttpClient } from '@angular/common/http';
import { OriginChange, OriginCoordsReceived } from '../search/search.actions';

@Injectable()
export class UserEffects {
  // geocodeService: google.maps.Geocoder;

  constructor(private actions$: Actions,
              private geolocation: Geolocation,
              private mapsAPILoadier: MapsAPILoader,
              private http: HttpClient) {
  }

  // ngOnInit() {
  //   this.mapsAPILoadier.load().then(() => {
  //     this.geocodeService = new google.maps.Geocoder();
  //   })
  // }

  @Effect() fetchCoords = this.actions$
    .ofType(FETCH_COORDS)
    .switchMap((action: FetchCoords) => {
      return Observable.fromPromise(this.geolocation.getCurrentPosition())
    })
    .mergeMap((resp: Geoposition) => {
      const coords: google.maps.LatLngLiteral = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      return [
        new CoordsReceived(coords),
        new OriginCoordsReceived(coords),
        new FetchAddress(coords)
      ]
    })
    .catch(err => {
      return Observable.of(new Error("geolocation error"));
      // TODO: why does this throw an error "Actions must have a type property" when I have a poor connection?
    });

  @Effect() fetchAddress = this.actions$
    .ofType(FETCH_ADDRESS)
    .switchMap((action: FetchAddress) => {
      const requestString = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.payload.lat},${action.payload.lng}&key=${GMAP_KEY}`;
      return this.http.get(requestString);
    })
    .mergeMap((response: any) => {
      if (response.results) {
        const address = response.results[0].formatted_address;
            return [
              new AddressReceived(address),
              new OriginChange(address)
            ]
          } else {
            throw new Error('no address')
          }
    });
}
