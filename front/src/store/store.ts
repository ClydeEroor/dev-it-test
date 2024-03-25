import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@/store/features/auth/authSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiApp } from '@/store/features/api/apiApp';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};
const reducer = combineReducers({
  [apiApp.reducerPath]: apiApp.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiApp.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
