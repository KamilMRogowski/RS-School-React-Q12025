import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import DarkThemeProvider from '../context/DarkThemeContext';
import { pokemonApi } from '../store/api/pokemonApi'; // Adjust the path
import selectedItemsReducer from '../store/slices/selectedItemsSlice';
import currentPageReducer from '../store/slices/currentPageSlice';
import { render } from '@testing-library/react';
import { RootState } from '../store/store';

const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      selectedItems: selectedItemsReducer,
      currentPage: currentPageReducer,
    },
    preloadedState: {
      selectedItems: { SelectedItems: [] },
      currentPage: { currentPageItems: [] },
      ...preloadedState,
    } as RootState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export default function renderWithProviders(
  component: React.ReactElement,
  preloadedState?: Partial<RootState>
) {
  const store = createTestStore(preloadedState);
  return {
    ...render(
      <Provider store={store}>
        <DarkThemeProvider>{component}</DarkThemeProvider>
      </Provider>
    ),
    store,
  };
}
