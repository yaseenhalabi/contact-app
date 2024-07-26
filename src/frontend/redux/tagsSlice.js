import { createSlice } from '@reduxjs/toolkit';

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [
        {id: '1', name: 'Work', color: '#df4040'}, 
        {id: '2', name: 'Grant Family', color: '#c4438a'}, 
        {id: '3', name: 'Poetry Club', color: '#54a145'}, 
        {id: '4', name: 'Computer Science Club', color: '#1794a0'},
        {id: '5', name: 'University of California', color: '#e050bf'}, 
        {id: '6', name: 'Rowing Team', color: '#2baa6a'}, 
        {id: '7', name: 'My Age', color: '#3446cc'}, 
        {id: '8', name: 'Johnson Family', color: '#c2114c'}
    ],
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

