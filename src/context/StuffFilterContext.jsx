import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const INITIAL_STUFF_FILTER = {
    country: "",
    city: "",
    airport: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
  }

const StuffFilterContext = createContext();
export default function StuffFilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_STUFF_FILTER);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
    console.log(newFilter)
  };


  return (
    <StuffFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </StuffFilterContext.Provider>
  );
}

export const useStuffFilter = () => useContext(StuffFilterContext);