import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number[] = [1];

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      const newPageNumber = action.payload;
      state.pop();
      state.push(newPageNumber);
    },
  },
});

export const { actions, reducer } = currentPageSlice;
