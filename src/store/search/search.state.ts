import { TripData } from '../../shared/tripData/tripData';
import { SearchQuery } from '../../shared/searchQuery';
import { TimeTarget } from '../../shared/timeTarget';

export interface SearchState {
  query: SearchQuery;
  fetching: boolean;
  result: TripData;
  originCoords: google.maps.LatLngLiteral,
  destinationCoords: google.maps.LatLngLiteral
}

export const searchInitialState: SearchState = {
  query: {
    origin: '',
    destination: '',
    timeTarget: TimeTarget.DEPART,
    time: new Date()
  },
  originCoords: undefined,
  destinationCoords: undefined,
  fetching: false,
  result: undefined
};
