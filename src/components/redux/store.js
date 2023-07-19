import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { getContacts, createContact } from '../Api';

const initialState = [];

// Definiujemy akcje asynchroniczne za pomocą funkcji createAsyncThunk
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

// Definiujemy slicer reducera
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Możemy zdefiniować dodatkowe akcje synchroniczne tutaj, jeśli są potrzebne
    // Na przykład akcje do aktualizacji kontaktu, czy czyszczenia listy kontaktów
  },
  extraReducers: builder => {
    // Obsługujemy rezultat akcji asynchronicznych
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload; // Set the contacts from the backend response
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.push(action.payload); // Add the newly created contact to the state
      })
      .addCase(fetchContacts.pending, state => {
        // Handle loading state if needed
      })
      .addCase(addContact.pending, state => {
        // Handle loading state if needed
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        // Handle error state if needed
      })
      .addCase(addContact.rejected, (state, action) => {
        // Handle error state if needed
      });
  },
});

// Eksportujemy akcje synchroniczne z slicera reducera
export const { _ } = contactsSlice.actions;

// Definiujemy pozostałe slicy reducera, jeśli są potrzebne
// Na przykład slicy do zarządzania filtrowaniem, usuwaniem kontaktów, itp.

// Kombinujemy slicy reducera w główny reducer
const rootReducer = {
  contacts: contactsSlice.reducer,
  // Dodajemy inne slicy reducera tutaj, jeśli są potrzebne
};

// Konfigurujemy i eksportujemy store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
