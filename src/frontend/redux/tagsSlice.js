import { createSlice } from '@reduxjs/toolkit';

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [
        {id: '1', name: 'Hinsdale Central', color: '#df4040'}, 
        {id: '2', name: 'Asbahi Family', color: '#c4438a'}, 
        {id: '3', name: 'People I Hate', color: '#54a145'}, 
        {id: '4', name: 'Computer Science Club', color: '#1794a0'},
        {id: '5', name: 'University of California', color: '#e050bf'}, 
        {id: '6', name: 'Smith Family', color: '#2baa6a'}, 
        {id: '7', name: 'Harvard University', color: '#3446cc'}, 
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

