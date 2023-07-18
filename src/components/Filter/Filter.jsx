// src/components/Filter.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/store';

const Filter = () => {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <div>
      <label>
        Find contacts by name:
        <input
          type="text"
          value={filterValue}
          onChange={e => dispatch(setFilter(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Filter;
