import { Place } from '../../shared/place';

export interface UserState {
  currentLocation: Place
  fetchingCoords: boolean;
  fetchingAddress: boolean;
}

export const userInitialState: UserState = {
  currentLocation: {
    address: '',
    coords: {
      lat: 37.777939,
      lng: -122.415085
    }
  },
  fetchingCoords: false,
  fetchingAddress: false
};
