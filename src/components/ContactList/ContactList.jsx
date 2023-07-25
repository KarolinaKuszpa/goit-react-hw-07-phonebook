import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/store';
import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = async contactId => {
    try {
      await dispatch(deleteContact(contactId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.item}>
          <span>{contact.name}:</span> {contact.number}
          <button
            type="button"
            className={styles.button}
            onClick={() => handleDeleteContact(contact.id)}
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
