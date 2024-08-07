import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
    name: 'people',
    initialState: [],
    reducers: {
        addPerson: (state, action) => {
            state.unshift(action.payload);
        },
        removePerson: (state, action) => {
            state.people = state.people.filter(person => person.id !== action.payload);
        },
        updatePersonsName: (state, action) => {
            state.find(person => person.id === action.payload.id).name = action.payload.newName
        },
        updatePersonsNotes: (state, action) => {
            state.find(person => person.id === action.payload.id).notes = action.payload.newNotes
        },
        updatePersonsAddress: (state, action) => {
            state.find(person => person.id === action.payload.id).address = action.payload.newAddress
        },
        updatePersonsBirthday: (state, action) => {
            state.find(person => person.id === action.payload.id).birthday = action.payload.newBirthday
        },
        updatePersonsTags: (state, action) => {
            state.find(person => person.id === action.payload.id).tags = action.payload.newIds
        },
        updatePersonsImages: (state, action) => {
            state.find(person => person.id === action.payload.id).images = action.payload.newImages
        }
    },
});

export const {
    addPerson,
    removePerson,
    updatePersonsName,
    updatePersonsNotes,
    updatePersonsAddress,
    updatePersonsBirthday,
    updatePersonsTags,
    updatePersonsImages
} = peopleSlice.actions;

export default peopleSlice.reducer

