import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../utils/interfaces/pokemonApiResponse';

export interface SelectedItemsState {
  SelectedItems: Pokemon[];
}

const initialState: SelectedItemsState = {
  SelectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addSelectedItem: (state, action: PayloadAction<Pokemon>) => {
      state.SelectedItems.push(action.payload);
    },
    removeSelectedItem: (state, action: PayloadAction<Pokemon>) => {
      state.SelectedItems = state.SelectedItems.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
    },
    clearSelectedItems: (state) => {
      state.SelectedItems = initialState.SelectedItems;
    },
  },
});

export const { addSelectedItem, removeSelectedItem, clearSelectedItems } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
