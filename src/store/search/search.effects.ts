import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/fromPromise';

import { TripData } from '../../shared/tripData/tripData';
import {
  DESTINATION_ITEM_CHOSEN, DestinationCoordsReceived, DestinationItemChosen,
  ORIGIN_ITEM_CHOSEN, OriginChange, OriginCoordsReceived, OriginItemChosen, ResultReceived,
  SEARCH
} from './search.actions';
import { MapsAPILoader } from '@agm/core';
import { GMAP_KEY } from '../../../environment/constants';
import { HttpClient } from '@angular/common/http';
import { fakeResult } from './fakeResult';

@Injectable()
export class SearchEffects {

  constructor(private actions$: Actions,
              private http: HttpClient) {}


  geocodePlaceId(placeId: string): Observable<google.maps.LatLngLiteral> {
    const requestString = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GMAP_KEY}`;
    return this.http.get(requestString).map((response: any) => {
      return {
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
      };
    });
  }

  @Effect() search = this.actions$
    .ofType(SEARCH)
    .delay(500) // TODO: Take this out when I have a real request
    .map((resp) => {
      return new ResultReceived(fakeResult)
    });

  @Effect() geocodeOriginAddress = this.actions$
    .ofType(ORIGIN_ITEM_CHOSEN)
    .switchMap((action: OriginItemChosen) => {
      return this.geocodePlaceId(action.payload)
    })
    .map((latlng: google.maps.LatLngLiteral) => {
      return new OriginCoordsReceived(latlng);
    });

  @Effect() geocodeDestinationAddress = this.actions$
    .ofType(DESTINATION_ITEM_CHOSEN)
    .switchMap((action: OriginItemChosen) => {
      return this.geocodePlaceId(action.payload)
    })
    .map((latlng: google.maps.LatLngLiteral) => {
      return new DestinationCoordsReceived(latlng);
    });
}
