import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/store';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Imię:
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <label className={styles.label}>
        Numer telefonu:
        <input
          className={styles.input}
          type="text"
          value={number}
          onChange={event => setNumber(event.target.value)}
        />
      </label>
      <button className={styles.button} type="submit">
        Dodaj kontakt
      </button>
    </form>
  );
};

export default ContactForm;
