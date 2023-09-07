import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const INITIAL_CLOSET_FILTER = {
    airport:"",//id veya isim tam bilemiyorum
    no:"",
    isEmpty:"",//status gibi bi şey de olabilir
}

const ClosetFilterContext = createContext();

export default function ClosetFilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_CLOSET_FILTER);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };


  return (
    <ClosetFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </ClosetFilterContext.Provider>
  );
}

export const useClosetFilter = () => useContext(ClosetFilterContext);