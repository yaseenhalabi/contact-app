import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';
import tagsSlice from './tagsSlice';
const store = configureStore({
  reducer: {
    people: peopleReducer,
    tags: tagsSlice,
  },
});

export default store;