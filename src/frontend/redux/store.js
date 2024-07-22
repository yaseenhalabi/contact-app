import { configureStore } from '@reduxjs/toolkit';
import peopleSlice from './peopleSlice';
import tagsSlice from './tagsSlice';
import preferencesSlice from './preferencesSlice';
const store = configureStore({
  reducer: {
    people: peopleSlice,
    tags: tagsSlice,
    preferences: preferencesSlice,
  },
});

export default store;