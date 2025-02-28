import { configureStore } from '@reduxjs/toolkit';

import currentQueryReducer from '../features/currentQuerySlice';
import { kinopoiskApi } from '../services/kinopoiskApi';
import searchQueryReducer from './../features/searchQuerySlice';

export const store = configureStore({
  reducer: {
    currentQuery: currentQueryReducer,
    searchQuery: searchQueryReducer,
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kinopoiskApi.middleware),
  devTools: true,
});
