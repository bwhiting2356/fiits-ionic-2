import { userInitialState, UserState } from './user.state';
import * as user from './user.actions';



export function userReducer(state = userInitialState, action: user.Actions): UserState {
  switch (action.type) {
    case user.FETCH_COORDS:
      return {...state, fetchingCoords: true, fetchingAddress: true };
    case user.COORDS_RECEIVED:
      return {...state, fetchingCoords: false, currentLocation: { address: '', coords: action.payload } };

    case user.FETCH_ADDRESS:
      return {...state, fetchingAddress: true };
    case user.ADDRESS_RECEIVED:
      return {...state, fetchingAddress: false, currentLocation: { ...state.currentLocation, address: action.payload } };

    case user.ERROR:
      return state;

    default:
      return state;
  }
}
