import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store';

const Filter = () => {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
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
