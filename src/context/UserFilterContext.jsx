import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const INITIAL_USER_FILTER = {
    name:"",
    surname:"",
    email:"",
    phone:"",
    //password:"",
}

const UserFilterContext = createContext();
export default function UserFilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_USER_FILTER);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };


  return (
    <UserFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </UserFilterContext.Provider>
  );
}

export const useUserFilter = () => useContext(UserFilterContext);