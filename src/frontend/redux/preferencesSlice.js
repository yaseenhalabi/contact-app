import { createSlice } from '@reduxjs/toolkit';

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {
        people: {
            sortMethod: 'alphabetical',
            tagFilters: [],

        },
        tags: {
            sortMethod: 'alphabetical',
        }
    },
    reducers: {
        setPeoplePrefernces: (state, action) => {
            state.people.newPeoplePreferences = action.payload;
        },
        setTagPreferences: (state, action) => {
            state.tags.newTagPreferences = action.payload;
        },
    }
});

export const {
    setPeoplePrefernces,
    setTagPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer

