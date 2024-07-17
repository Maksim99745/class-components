import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, { payload: name }) => {
      const index = state.indexOf(name);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(name);
      }
    },
  },
});

export const { actions, reducer } = favoritesSlice;
