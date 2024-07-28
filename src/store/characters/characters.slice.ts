import { CharactersData } from '@models/character';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CharactersData[] = [];

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacters: (state, action: PayloadAction<CharactersData | undefined>) => {
      const characters = action.payload;
      state.pop();
      if (characters) {
        state.push(characters);
      }
    },
  },
});

export const { actions, reducer } = charactersSlice;
