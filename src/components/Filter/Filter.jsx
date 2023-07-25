import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/store';
import styles from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <label className={styles.label}>
      Filtruj kontakty:
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </label>
  );
};

export default Filter;
