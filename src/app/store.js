import { configureStore } from '@reduxjs/toolkit';

import currentQueryReducer from '../features/currentQuerySlice';
import { kinopoiskApi } from '../services/kinopoiskApi';

export const store = configureStore({
  reducer: {
    currentQuery: currentQueryReducer,
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kinopoiskApi.middleware),
  devTools: true,
});
