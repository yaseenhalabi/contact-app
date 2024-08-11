import { createSlice } from '@reduxjs/toolkit';

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [],
    reducers: {
        addTag: (state, action) => {
            state.unshift(action.payload);
        },
        removeTags: (state, action) => {
            return state.filter(tag => !action.payload.includes(tag.id));
        }
    }
});

export const {
    addTag,
    removeTags,
} = tagsSlice.actions;

export default tagsSlice.reducer

