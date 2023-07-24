import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, createContact } from '../components/Api';

const initialState = [];

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const contacts = await getContacts();
    return contacts;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const newContact = await createContact(contact);
    return newContact;
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default contactSlice.reducer;
