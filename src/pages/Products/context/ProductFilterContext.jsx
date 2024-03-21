import React, { createContext, useEffect, useState } from "react";

export const ProductFilterContext = createContext();

const ProductFilterProvider = ({ children }) => {
  const [productFilter, setProductFilter] = useState({
    category: "",
    subcategory: "",
    sizes: "",
    brand: "",
    color: "",
    min: "",
    max: "",
    id: "",
    productName: "",
  });

  const [pageConfig, setPageConfig] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [queryString, setQueryString] = useState("?pageSize=10&pageIndex=1");

  const buildQueryString = () => {
    const filters = { ...productFilter, ...pageConfig };

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
    setProductFilter((prev) => ({ ...prev, ...newValues }));
  };

  const updatePageConfig = (newValues) => {
    setPageConfig((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    buildQueryString();
  }, [productFilter, pageConfig]);

  const contextValue = {
    productFilter,
    pageConfig,
    updatePageConfig,
    updateFilters,
    queryString,
  };

  return (
    <ProductFilterContext.Provider value={contextValue}>
      {children}
    </ProductFilterContext.Provider>
  );
};

export default ProductFilterProvider;
