import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import { fetchContacts, deleteContact } from '../components/redux/store';
import styles from './ContactForm/ContactForm.module.css';

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

  const handleDeleteContact = async contactId => {
    try {
      await dispatch(deleteContact(contactId)); // Wait for the contact to be deleted
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div className={`${styles.container} container`}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact} // Pass the delete function as a prop
      />
    </div>
  );
};

export default App;
