import { createSlice } from '@reduxjs/toolkit';

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {
        people: {
            sortMethod: '',
            tagFilters: [],

        },
        tags: {
            sortMethod: 'alphabetical',
        }
    },
    reducers: {
        updatePeoplePreferences: (state, action) => {
            state.people = action.payload;
            console.log(state.people.tagFilters);
        },
        updateTagPreferences: (state, action) => {
            state.tags = action.payload;
        },
    }
});

export const {
    updatePeoplePreferences,
    updateTagPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer

