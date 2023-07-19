import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/store';

import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      setErrorMessage('Please provide both name and number.');
      return;
    }

    const contact = { name, number };

    try {
      await dispatch(addContact(contact)); // Wait for the contact to be added
      setName('');
      setNumber('');
    } catch (error) {
      setErrorMessage('Error adding contact. Please try again later.');
    }
  };

  const handleNameChange = e => {
    setName(e.target.value);
    setErrorMessage('');
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
    setErrorMessage('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          className={styles.input}
          required
        />
      </label>
      <button type="submit" className={styles.button}>
        Add contact
      </button>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
};

export default ContactForm;
