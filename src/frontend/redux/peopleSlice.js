import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
    name: 'people',
    initialState: [
        {
            id: '29051',
            name: "John Sock",
            tags: ['2', '5', '1'],
            birthday: "1995-05-01T00:00:00.000Z",
            address: "123 Fake Street",
            notes: `This is a not this is more stuffthis is some more notes`,
            xLink: "https://www.google.com",
            instagramLink: "https://www.instagram.com",
            images: []
        },
        {
            id: '12345',
            name: "Jane Mick",
            tags: ['2', '4', '6'],
            birthday: "2006-02-12T00:00:00.000Z",
            address: "3234 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/janesmith",
            images: []
        },
        {
            id: '98765',
            name: "Michael Johnson",
            tags: ['6', '3', '1'],
            birthday: "1985-08-14T00:00:00.000Z",
            address: "None",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/michaeljohnson",
            images: []
        },
        {
            id: '54321',
            name: "Sarah Johnson",
            tags: ['1', '3', '5'],
            birthday: "1990-12-05T00:00:00.000Z",
            address: "456 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/sarahjohnson",
            images: []
        },
        {
            id: '67890',
            name: "David Smith",
            tags: ['2', '4', '6'],
            birthday: "1988-07-20T00:00:00.000Z",
            address: "789 Fake Street",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/davidsmith",
            images: []
        },
        {
            id: '13579',
            name: "Emily Johnson",
            tags: ['1', '4', '6'],
            birthday: "1992-09-18T00:00:00.000Z",
            address: "987 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/emilyjohnson",
            images: []
        },
        {
            id: '24680',
            name: "Daniel Smith",
            tags: ['2', '3', '5'],
            birthday: "1998-04-25T00:00:00.000Z",
            address: "654 Fake Street",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/danielsmith",
            images: []
        },
        {
            id: '11223',
            name: "Olivia Johnson",
            tags: ['1', '4', '6'],
            birthday: "1994-11-30T00:00:00.000Z",
            address: "321 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/oliviajohnson",
            images: []
        },
        {
            id: '33445',
            name: "Ethan Smith",
            tags: ['2', '3', '5'],
            birthday: "1997-06-15T00:00:00.000Z",
            address: "789 Fake Street",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/ethansmith",
            images: []
        },
        {
            id: '55667',
            name: "Sophia Johnson",
            tags: ['1', '4', '6'],
            birthday: "1993-10-10T00:00:00.000Z",
            address: "987 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/sophiajohnson",
            images: []
        },
        {
            id: '77889',
            name: "Aiden Smith",
            tags: ['2', '3', '5'],
            birthday: "1996-07-05T00:00:00.000Z",
            address: "654 Fake Street",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/aidensmith",
            images: []
        },
        {
            id: '99001',
            name: "Isabella Johnson",
            tags: ['1', '4', '6'],
            birthday: "1991-12-20T00:00:00.000Z",
            address: "321 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/isabellajohnson",
            images: []
        },
        {
            id: '11222',
            name: "Mason Smith",
            tags: ['2', '3', '5'],
            birthday: "1999-05-25T00:00:00.000Z",
            address: "789 Fake Street",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/masonsmith",
            images: []
        },
        {
            id: '33443',
            name: "Charlotte Johnson",
            tags: ['1', '4', '6'],
            birthday: "1993-11-15T00:00:00.000Z",
            address: "987 Fake Street",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/charlottejohnson",
            images: []
        },
        {
            id: '55665',
            name: "Liam Smith",
            tags: ['2', '3', '5'],
            birthday: "1996-08-10T00:00:00.000Z",
            address: "654 Fake Street",
            notes: "Nulla facilisi. Sed euismod, nunc a aliquam eleifend, mauris justo lacinia mauris, vitae luctus nunc risus a nunc.",
            xLink: "https://www.example.com",
            instagramLink: "https://www.instagram.com/liamsmith",
            images: []
        }
    ],
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

