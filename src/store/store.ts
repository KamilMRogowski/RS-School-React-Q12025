import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './api/pokemonApi';
import currentPageReducer from './slices/currentPageSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';

// SUGGESTED STORE SETUP FROM DOCS
// const rootReducer = combineReducers({
//   [pokemonApi.reducerPath]: pokemonApi.reducer,
//   currentPage: currentPageReducer,
//   selectedItems: selectedItemsReducer,
// });

// export const setupStore = (preloadedState?: Partial<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//     middleware: (getDefaultMiddleware) => {
//       return getDefaultMiddleware().concat(pokemonApi.middleware);
//     },
//   });
// };

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    currentPage: currentPageReducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
