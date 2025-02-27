import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import carsReducer from './cars/slice';
import filtersReducer from './filters/slice';
import favouriteCarsReducer from './favouriteCars/slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favouriteCars'],
};

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favouriteCars: persistReducer(persistConfig, favouriteCarsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
