import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './api/pokemonApi';
import currentPageReducer from './slices/currentPageSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  currentPage: currentPageReducer,
  selectedItems: selectedItemsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
