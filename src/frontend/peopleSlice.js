import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
    name: 'people',
    initialState: [{id: '29051', name: "John Sock", tags: [["Hinsdale Central", "#df4040"], ["Asbahi Family", "#c4438a"], ["People I Hate", "#4fbf38"], ["Computer Science Club", "#1794a0"]], birthday: "5/29/2001", address: "123 Fake Street", notes: `This is a not this is more stuffthis is some more notes`, xLink: "https://www.google.com", instagramLink: "https://www.instagram.com", }, { id: '12345', name: "Jane Mick", tags: [["University of California", "#ec7dd2"], ["Smith Family", "#2baa6a"]], birthday: "03/05/1990", address: "3234 Fake Street", notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", xLink: "https://www.example.com", instagramLink: "https://www.instagram.com/janesmith", }, { id: '98765', name: "Michael Johnson", tags: [["Harvard University", "#122089"], ["Johnson Family", "#c2114c"]], birthday: "07/22/1985", address: "None", notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.", xLink: "https://www.example.com", instagramLink: "https://www.instagram.com/michaeljohnson"}],
    reducers: {
        addPerson: (state, action) => {
            try {
                state.push(action.payload);
            }
            catch (e) {
                console.log(state)
                console.log(e);
            }
        },
        removePerson: (state, action) => {
            state.people = state.people.filter(person => person.id !== action.payload);
        },
    },
});

export const { addPerson, removePerson } = peopleSlice.actions
export default peopleSlice.reducer

