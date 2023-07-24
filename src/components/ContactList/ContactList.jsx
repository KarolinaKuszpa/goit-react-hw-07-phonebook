import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContactAsync } from '../redux/store';
import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = contactId => {
    dispatch(removeContactAsync(contactId));
  };

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={styles.item}>
          {contact.name}: {contact.number}
          <button
            className={styles.button}
            onClick={() => handleDeleteContact(contact.id)}
            type="button"
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
