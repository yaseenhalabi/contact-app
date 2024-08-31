import { createSlice } from '@reduxjs/toolkit';

const peopleSlice = createSlice({
    name: 'people',
    initialState: [],
    reducers: {
        addPerson: (state, action) => {
            state.unshift(action.payload);
        },
        removePeople: (state, action) => {
            const idsToRemove = action.payload;
            state.splice(0, state.length, ...state.filter(person => !idsToRemove.includes(person.id)));
        },
        updatePersonsName: (state, action) => {
            const person = state.find(person => person.id === action.payload.id);
            if (person) {
                person.name = action.payload.newName;
            }
        },
        updatePersonsNotes: (state, action) => {
            const person = state.find(person => person.id === action.payload.id);
            if (person) {
                person.notes = action.payload.newNotes;
            }
        },
        updatePersonsAddress: (state, action) => {
            const person = state.find(person => person.id === action.payload.id);
            if (person) {
                person.address = action.payload.newAddress;
            }
        },
        updatePersonsBirthday: (state, action) => {
            const person = state.find(person => person.id === action.payload.id);
            if (person) {
                person.birthday = action.payload.newBirthday;
            }
        },
        updatePersonsTags: (state, action) => {
            const person = state.find(person => person.id === action.payload.id);
            if (person) {
                person.tags = action.payload.newIds;
            }
        },
        updatePersonsImages: (state, action) => {
            const person = state.find(person => person.id === action.payload.id);
            if (person) {
                person.images = action.payload.newImages;
            }
        }
    },
});

export const {
    addPerson,
    removePeople,
    updatePersonsName,
    updatePersonsNotes,
    updatePersonsAddress,
    updatePersonsBirthday,
    updatePersonsTags,
    updatePersonsImages
} = peopleSlice.actions;

export default peopleSlice.reducer;
