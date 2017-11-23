import { ActionReducerMap } from '@ngrx/store';

import { userInitialState, UserState } from './user/user.state';
import { userReducer } from './user/user.reducer';
import { searchInitialState, SearchState } from './search/search.state';
import { searchReducer } from './search/search.reducer';

export interface AppState {
  user: UserState,
  search: SearchState
}
export const initialState: AppState = {
  user: userInitialState,
  search: searchInitialState
};

export const reducer: ActionReducerMap<AppState> = {
  user: userReducer,
  search: searchReducer
};
