import { Character } from '@models/character';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Character[] = [];

export const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const index = state.findIndex((fav) => fav.name === character.name);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(character);
      }
    },
    unselectAll: (state) => {
      for (let i = 0; i < state.length; i += 1) {
        state.splice(0, state.length);
      }
    },
  },
});

export const { actions, reducer } = favoritesSlice;
