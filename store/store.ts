import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { api } from './api/api';
import { reducer as charactersReducer } from './characters/characters.slice';
import { reducer as currentPageReducer } from './currentPage/currentPage.slice';
import { reducer as favoritesReducer } from './favorites/favorites.slice';

const reducers = combineReducers({
  currentPage: currentPageReducer,
  favorites: favoritesReducer,
  characters: charactersReducer,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
