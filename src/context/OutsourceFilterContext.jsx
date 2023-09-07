import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const INITIAL_OUTSOURCE_FILTER = {

    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
  }

const OutsourceFilterContext = createContext();
export default function OutsourceFilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_OUTSOURCE_FILTER);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
    console.log(newFilter)
  };


  return (
    <OutsourceFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </OutsourceFilterContext.Provider>
  );
}

export const useOutsourceFilter = () => useContext(OutsourceFilterContext);