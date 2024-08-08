import { createSlice } from '@reduxjs/toolkit';

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [],
    reducers: {
        addTag: (state, action) => {
            state.unshift(action.payload);
        },
        removeTag: (state, action) => {
            state = state.filter(tag => tag.id !== action.payload);
        }
    }
});

export const {
    addTag,
    removeTag,
} = tagsSlice.actions;

export default tagsSlice.reducer

