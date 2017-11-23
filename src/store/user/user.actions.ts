import { Action } from '@ngrx/store';

// **********  Geolocation  **********

export const FETCH_COORDS = 'FETCH_COORDS';
export class FetchCoords implements Action {
  readonly type = FETCH_COORDS;
}

export const COORDS_RECEIVED = 'COORDS_RECEIVED';
export class CoordsReceived implements Action {
  readonly type = COORDS_RECEIVED;

  constructor(public payload: google.maps.LatLngLiteral) {}
}

export const ERROR = 'ERROR';
export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export const FETCH_ADDRESS = 'FETCH_ADDRESS';
export class FetchAddress implements Action {
  readonly type = FETCH_ADDRESS;

  constructor(public payload: google.maps.LatLngLiteral) {}
}

export const ADDRESS_RECEIVED = 'ADDRESS_RECEIVED';
export class AddressReceived implements Action {
  readonly type = ADDRESS_RECEIVED;

  constructor(public payload: string) {}
}

export type Actions
  = FetchCoords
  | CoordsReceived
  | FetchAddress
  | AddressReceived
  | Error;
