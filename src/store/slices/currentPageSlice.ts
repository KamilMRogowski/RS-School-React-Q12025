import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../utils/interfaces/pokemonApiResponse';

interface currentPageState {
  currentPageItems: Pokemon[];
}

// SAVE AN ARRAY OF POKEMON DOWNLOADED FROM API
const initialState: currentPageState = {
  currentPageItems: [],
};

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    addCurrentPageItem: (state, action: PayloadAction<Pokemon>) => {
      state.currentPageItems.push(action.payload);
    },
    clearCurrentPage: (state) => {
      state.currentPageItems = initialState.currentPageItems;
    },
  },
});

export const { addCurrentPageItem, clearCurrentPage } =
  currentPageSlice.actions;
export default currentPageSlice.reducer;
