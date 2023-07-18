import { configureStore, createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = filterSlice.actions;

const reducer = {
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
};

const store = configureStore({
  reducer,
});

export default store;
