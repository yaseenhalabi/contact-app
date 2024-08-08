// store.js
import { configureStore } from '@reduxjs/toolkit';
import peopleSlice from './peopleSlice';
import tagsSlice from './tagsSlice';
import preferencesSlice from './preferencesSlice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  people: peopleSlice,
  tags: tagsSlice,
  preferences: preferencesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
