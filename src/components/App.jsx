import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import {
  fetchContacts,
  addContact,
  deleteContact,
  setFilter,
} from '../redux/store';
import Filter from './Filter/Filter';
import styles from './ContactList/ContactList.module.css';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
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
    <div className={`${styles.container} container`}>
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
