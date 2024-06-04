import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
    name: 'people',
    initialState: [{id: '29051', name: "John Sock", tags: [["Hinsdale Central", "#df4040"], ["Asbahi Family", "#c4438a"], ["People I Hate", "#4fbf38"], ["Computer Science Club", "#1794a0"]], birthday: "1995-05-01T00:00:00.000Z", address: "123 Fake Street", notes: `This is a not this is more stuffthis is some more notes`, xLink: "https://www.google.com", instagramLink: "https://www.instagram.com", }, { id: '12345', name: "Jane Mick", tags: [["University of California", "#ec7dd2"], ["Smith Family", "#2baa6a"]], birthday: "2006-02-12T00:00:00.000Z", address: "3234 Fake Street", notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", xLink: "https://www.example.com", instagramLink: "https://www.instagram.com/janesmith", }, { id: '98765', name: "Michael Johnson", tags: [["Harvard University", "#122089"], ["Johnson Family", "#c2114c"]], birthday: "1985-08-14T00:00:00.000Z", address: "None", notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.", xLink: "https://www.example.com", instagramLink: "https://www.instagram.com/michaeljohnson"}],
    reducers: {
        addPerson: (state, action) => {
            state.push(action.payload);
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
            state.find(person => person.id === action.payload.id).tags = action.payload.newTags
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
} = peopleSlice.actions;

export default peopleSlice.reducer

