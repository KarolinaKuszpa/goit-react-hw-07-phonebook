import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL =
  'https://64b8205821b9aa6eb0799603.mockapi.io/contacts/contacts';

const contactsAPI = axios.create({
  baseURL: API_BASE_URL,
});

export const getContacts = async () => {
  const response = await contactsAPI.get('/');
  return response.data;
};

export const createContact = async contact => {
  const response = await contactsAPI.post('/', contact);
  return response.data;
};

export const updateContact = async (id, contact) => {
  const response = await contactsAPI.put(`/${id}`, contact);
  return response.data;
};

export const deleteContact = async id => {
  await contactsAPI.delete(`/${id}`);
};

const contactsAPI = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await contactsAPI.get('/contacts');
    return response.data;
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await contactsAPI.post('/contacts', contact);
    return response.data;
  }
);

export const removeContactAsync = createAsyncThunk(
  'contacts/removeContact',
  async contactId => {
    await contactsAPI.delete(`/contacts/${contactId}`);
    return contactId;
  }
);

const initialState = {
  contacts: [],
  filter: '',
};

const store = configureStore({
  reducer: {
    contacts: (state = initialState.contacts, action) => {
      switch (action.type) {
        case fetchContactsAsync.fulfilled.type:
          return action.payload;
        case addContactAsync.fulfilled.type:
          return [...state, action.payload];
        case removeContactAsync.fulfilled.type:
          return state.filter(contact => contact.id !== action.payload);
        default:
          return state;
      }
    },
    filter: (state = initialState.filter, action) => {
      switch (action.type) {
        case 'SET_FILTER':
          return action.payload;
        default:
          return state;
      }
    },
  },
});

export default store;
