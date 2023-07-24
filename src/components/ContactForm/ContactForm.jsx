import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContactAsync } from '../redux/store';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    const contact = { name, number };
    dispatch(addContactAsync(contact));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Nazwa:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Numer:
        <input
          type="text"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button className={styles.button} type="submit">
        Dodaj kontakt
      </button>
    </form>
  );
};

export default ContactForm;
