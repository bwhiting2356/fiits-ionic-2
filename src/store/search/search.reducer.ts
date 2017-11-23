import { searchInitialState, SearchState } from './search.state';
import * as search from './search.actions';

export function searchReducer(state = searchInitialState, action: search.Actions): SearchState {
  switch (action.type) {
    case search.ORIGIN_CHANGE:
      return {...state, query: {...state.query, origin: action.payload } };

    case search.ORIGIN_ITEM_CHOSEN:
      return {...state, fetching: true };

    case search.ORIGIN_COORDS_RECEIVED:
      return {...state, fetching: false, originCoords: action.payload };

    case search.DESTINATION_CHANGE:
      return {...state, query: {...state.query, destination: action.payload } };

    case search.DESTINATION_ITEM_CHOSEN:
      return {...state, fetching: true };

    case search.DESTINATION_COORDS_RECEIVED:
      return {...state, fetching: false, destinationCoords: action.payload };

    case search.TIME_TARGET_CHANGE:
      return {...state, query: {...state.query, timeTarget: action.payload } };

    case search.TIME_CHANGE:
      return {...state, query: {...state.query, date: action.payload } };

    case search.SEARCH:
      return {...state, fetching: true };

    case search.RESULT_RECEIVED:
      return {...state, fetching: false, result: action.payload};

    default:
      return state;
  }
}
