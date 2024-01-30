import React, { createContext, useContext, useEffect, useState } from "react";

// Context'i oluşturun
export const UserFilterContext = createContext();

// Context'in sağlayacağı değerleri ve işlevleri içeren bir sağlayıcı bileşen oluşturun
const UserFilterProvider = ({ children }) => {
  const [userFilter, setUserFilter] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [pageConfig, setPageConfig] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [queryString, setQueryString] = useState("?pageSize=10&pageIndex=1");

  const buildQueryString = () => {
    const filters = { ...userFilter, ...pageConfig };

    if (!filters.pageIndex) {
      filters.pageIndex = 1;
    }
    if (!filters.pageSize) {
      filters.pageSize = 10;
    }

    const queryString = Object.keys(filters)
      .filter((key) => filters[key] !== "")
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join("&");

    if (queryString !== "") {
      setQueryString(`?${queryString}`);
    } else {
      setQueryString("?pageSize=10&pageIndex=1");
    }
  };

  const updateFilters = (newValues) => {
    setUserFilter((prev) => ({ ...prev, ...newValues }));
  };

  const updatePageConfig = (newValues) => {
    setPageConfig((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    buildQueryString();
  }, [userFilter, pageConfig]);

  const contextValue = {
    userFilter,
    pageConfig,
    updatePageConfig,
    updateFilters,
    queryString,
    //buildQueryString,
  };

  return (
    <UserFilterContext.Provider value={contextValue}>
      {children}
    </UserFilterContext.Provider>
  );
};

export default UserFilterProvider;
