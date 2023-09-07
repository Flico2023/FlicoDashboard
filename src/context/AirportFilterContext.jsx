import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const AirportFilterContext = createContext({
  city: '',
  country: '',
});
export default function AirportFilterProvider({ children }) {
  const [filter, setFilter] = useState({ city: '', country: '' });

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