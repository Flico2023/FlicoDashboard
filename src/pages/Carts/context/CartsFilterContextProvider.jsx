import React, { createContext,  useEffect, useState } from "react";


export const CartFilterContext = createContext();

const CartFilterProvider = ({ children }) => {
  const [cartFilter, setCartFilter] = useState({
    productId: "",
    userId: "",
  });

  const [pageConfig, setPageConfig] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [queryString, setQueryString] = useState("?pageSize=10&pageIndex=1");

  const buildQueryString = () => {
    const filters = { ...cartFilter, ...pageConfig };

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
    setCartFilter((prev) => ({ ...prev, ...newValues }));
  };

  const updatePageConfig = (newValues) => {
    setPageConfig((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    buildQueryString();
  }, [cartFilter, pageConfig]);

  const contextValue = {
    cartFilter,
    pageConfig,
    updatePageConfig,
    updateFilters,
    queryString,

  };

  return (
    <CartFilterContext.Provider value={contextValue}>
      {children}
    </CartFilterContext.Provider>
  );
};

export default CartFilterProvider;
