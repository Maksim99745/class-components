import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as charactersReducer } from './characters/characters.slice';
import { reducer as currentPageReducer } from './currentPage/currentPage.slice';
import { reducer as favoritesReducer } from './favorites/favorites.slice';

const reducers = combineReducers({
  currentPage: currentPageReducer,
  favorites: favoritesReducer,
  characters: charactersReducer,
});

const store = configureStore({
  reducer: reducers,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
