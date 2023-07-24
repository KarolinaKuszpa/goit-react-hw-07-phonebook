import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { fetchContactsAsync } from './redux/store';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Książka telefoniczna</h1>
      <ContactForm />
      <h2>Kontakty</h2>
      <Filter />
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
