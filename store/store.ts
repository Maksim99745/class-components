import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as favoritesReducer } from './favorites/favorites.slice';

const reducers = combineReducers({
  favorites: favoritesReducer,
});

const store = configureStore({
  reducer: reducers,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
