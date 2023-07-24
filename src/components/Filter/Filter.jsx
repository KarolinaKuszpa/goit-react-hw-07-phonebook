import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';

const Filter = () => {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value });
  };

  return (
    <div>
      <label>
        Znajdź kontakty według nazwy:
        <input
          className={styles.input}
          type="text"
          value={filterValue}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};

export default Filter;
