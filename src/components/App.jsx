import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  addContact,
  setFilter,
  deleteContact,
} from '../components/redux/store';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    filter ? contact.name.toLowerCase().includes(filter.toLowerCase()) : true
  );

  const handleAddContact = async contact => {
    await dispatch(addContact(contact));
  };

  const handleDeleteContact = async contactId => {
    await dispatch(deleteContact(contactId));
  };

  const handleFilterChange = value => {
    dispatch(setFilter(value));
  };

  return (
    <div className={`container`}>
      <h1>Książka telefoniczna</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Kontakty</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
