/* eslint-disable react/prop-types */
import React, { useState,useContext } from 'react';
import { createContext } from 'react';

/**
 * @typedef {object} filter
 * @property {string} filter.city
 * @property {string} filter.country 
 */

const AirportFilterContext = createContext({
  filter: { city: '', country: '' },
  /** @param {filter} filter */
  updateFilter: (filter) => {},
});

export default function AirportFilterProvider({ children }) {
  const [filter, setFilter] = useState({ city: '', country: '' });

  /** @param {filter} newFilter */
  const updateFilter = (newFilter) => {
    setFilter(newFilter);
    console.log(newFilter)
  };


  return (
    <AirportFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </AirportFilterContext.Provider>
  );
}

export const useAirportFilter = () => useContext(AirportFilterContext);