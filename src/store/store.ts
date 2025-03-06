import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './api/pokemonApi';
import currentPageReducer from './slices/currentPageSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  currentPage: currentPageReducer,
  selectedItems: selectedItemsReducer,
});

export const setupStoreTest = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
};

export const setupStoreSSR = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStoreSSR>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStoreSSR);
