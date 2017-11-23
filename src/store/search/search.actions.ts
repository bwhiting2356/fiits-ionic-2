import { Action } from '@ngrx/store';
import { TripData } from '../../shared/tripData/tripData';
import { SearchQuery } from "../../shared/searchQuery";

// ********** Search query field changes *********

export const ORIGIN_ITEM_CHOSEN = 'ORIGIN_ITEM_CHOSEN';
export class OriginItemChosen implements Action {
  readonly type = ORIGIN_ITEM_CHOSEN;

  constructor(public payload: string) {}
}

export const ORIGIN_COORDS_RECEIVED = 'ORIGIN_COORDS_RECEIVED';
export class OriginCoordsReceived implements Action {
  readonly type = ORIGIN_COORDS_RECEIVED;

  constructor(public payload: google.maps.LatLngLiteral) {}
}

export const ORIGIN_CHANGE = 'ORIGIN_CHANGE';
export class OriginChange implements Action {
  readonly type = ORIGIN_CHANGE;

  constructor(public payload: string) {}
}

export const DESTINATION_ITEM_CHOSEN = 'DESTINATION_ITEM_CHOSEN';
export class DestinationItemChosen implements Action {
  readonly type = DESTINATION_ITEM_CHOSEN;

  constructor(public payload: string) {}
}

export const DESTINATION_COORDS_RECEIVED = 'DESTINATION_COORDS_RECEIVED';
export class DestinationCoordsReceived implements Action {
  readonly type = DESTINATION_COORDS_RECEIVED;

  constructor(public payload: google.maps.LatLngLiteral) {}
}

export const DESTINATION_CHANGE = 'DESTINATION_CHANGE';
export class DestinationChange implements Action {
  readonly type = DESTINATION_CHANGE;

  constructor(public payload: string) {}
}



export const TIME_CHANGE = 'TIME_CHANGE';
export class TimeChange implements Action {
  readonly type = TIME_CHANGE;

  constructor(public payload: Date) {}
}

export const TIME_TARGET_CHANGE = 'TIME_TARGET_CHANGE';
export class TimeTargetChange implements Action {
  readonly type = TIME_TARGET_CHANGE;

  constructor(public payload: string) {}
}

// ********** Submit request and receive results **********

export const SEARCH = 'SEARCH';
export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: SearchQuery) {}
}

export const RESULT_RECEIVED = 'RESULT_RECEIVED';
export class ResultReceived implements Action {
  readonly type = RESULT_RECEIVED;

  constructor(public payload: TripData) {}
}

export type Actions
  = OriginItemChosen
  | OriginChange
  | OriginCoordsReceived
  | DestinationItemChosen
  | DestinationChange
  | DestinationCoordsReceived
  | TimeChange
  | TimeTargetChange
  | Search
  | ResultReceived;
