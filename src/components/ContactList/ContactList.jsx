// src/components/ContactList.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/store';

import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.item}>
          <span>{contact.name}:</span> {contact.number}
          <button
            type="button"
            className={styles.button}
            onClick={() => dispatch(deleteContact(contact.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
