import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store'; // Poprawiona ścieżka
import styles from './ContactForm.module.css';
const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      setErrorMessage('Proszę podać nazwę i numer.');
      return;
    }
    const contact = { name, number };
    try {
      await dispatch(addContact(contact));
      setName('');
      setNumber('');
    } catch (error) {
      setErrorMessage(
        'Błąd podczas dodawania kontaktu. Spróbuj ponownie później.'
      );
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
      <label>
        Nazwa:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Numer:
        <input type="text" value={number} onChange={handleNumberChange} />
      </label>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <button type="submit">Dodaj kontakt</button>
    </form>
  );
};

export default ContactForm;
