import React, { createContext, useEffect, useState } from "react";

export const OrderFilterContext = createContext();

const OrderFilterProvider = ({ children }) => {
  const [orderFilter, setOrderFilter] = useState({

  });

  const [pageConfig, setPageConfig] = useState({
    pageSize: 100,
    pageIndex: 1,
  });

  const [queryString, setQueryString] = useState("?pageSize=100&pageIndex=1");

  const buildQueryString = () => {
    const filters = { ...orderFilter, ...pageConfig };

    if (!filters.pageIndex) {
      filters.pageIndex = 1;
    }
    if (!filters.pageSize) {
      filters.pageSize = 100;
    }

    const queryString = Object.keys(filters)
      .filter((key) => filters[key] !== "")
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join("&");

    if (queryString !== "") {
      setQueryString(`?${queryString}`);
    } else {
      setQueryString("?pageSize=100&pageIndex=1");
    }
  };

  const updateFilters = (newValues) => {
    setOrderFilter((prev) => ({ ...prev, ...newValues }));
  };

  const updatePageConfig = (newValues) => {
    setPageConfig((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    buildQueryString();
  }, [orderFilter, pageConfig]);

  const contextValue = {
    orderFilter,
    pageConfig,
    updatePageConfig,
    updateFilters,
    queryString,
  };

  return (
    <OrderFilterContext.Provider value={contextValue}>
      {children}
    </OrderFilterContext.Provider>
  );
};

export default OrderFilterProvider;
