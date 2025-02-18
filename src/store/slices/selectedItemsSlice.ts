import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../utils/interfaces/pokemonApiResponse';

interface SelectedItemsState {
  SelectedItems: Pokemon[];
}

// SAVE AN ARRAY OF POKEMON DOWNLOADED FROM API
const initialState: SelectedItemsState = {
  SelectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    addSelectedItem: (state, action: PayloadAction<Pokemon>) => {
      state.SelectedItems.push(action.payload);
    },
    removeSelectedItem: (state, action: PayloadAction<Pokemon>) => {
      state.SelectedItems.filter((pokemon) => pokemon.id !== action.payload.id);
    },
    clearSelectedItems: (state) => {
      state.SelectedItems = initialState.SelectedItems;
    },
  },
});

export const { addSelectedItem, removeSelectedItem, clearSelectedItems } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
