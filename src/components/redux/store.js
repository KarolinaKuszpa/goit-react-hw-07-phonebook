import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://64b8205821b9aa6eb0799603.mockapi.io/contacts';

const contactsAPI = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await contactsAPI.get('/contacts');
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await contactsAPI.post('/contacts', contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await contactsAPI.delete(`/contacts/${contactId}`);
    return contactId;
  }
);

export const setFilter = createAsyncThunk(
  'contacts/setFilter',
  async filter => {
    const response = await contactsAPI.get('/contacts');
    const filteredContacts = response.data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(setFilter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filter = action.meta.arg;
      })
      .addCase(setFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});

export default store;
