import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const INITIAL_OUTPRODUCT_FILTER = {
    product:"",//id veya isim tam bilemiyorum
    outproduct:"",//id veya isim tam bilemiyorum
    airport:"",//id veya isim tam bilemiyorum
    status:"",
  }

const OutProductFilterContext = createContext();
export default function OutproductFilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_OUTPRODUCT_FILTER);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };


  return (
    <OutProductFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </OutProductFilterContext.Provider>
  );
}

export const useOutproductFilter = () => useContext(OutProductFilterContext);