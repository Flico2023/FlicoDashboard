import React, { createContext,  useEffect, useState } from "react";

// Context'i oluşturun
export const ContactUsFilterContext = createContext();

// Context'in sağlayacağı değerleri ve işlevleri içeren bir sağlayıcı bileşen oluşturun
const ContactUsFilterProvider = ({ children }) => {
  const [contactUsFilter, setContactUsFilter] = useState({
    name: "",
    subject: "",
    date: "",
    email: "",
    status: "",
    messageId: "",
  });

  const [pageConfig, setPageConfig] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [queryString, setQueryString] = useState("?pageSize=10&pageIndex=1");

  const buildQueryString = () => {
    const filters = { ...contactUsFilter, ...pageConfig };

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
    setContactUsFilter((prev) => ({ ...prev, ...newValues }));
  };

  const updatePageConfig = (newValues) => {
    setPageConfig((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    buildQueryString();
  }, [contactUsFilter, pageConfig]);

  const contextValue = {
    contactUsFilter,
    pageConfig,
    updatePageConfig,
    updateFilters,
    queryString,

  };

  return (
    <ContactUsFilterContext.Provider value={contextValue}>
      {children}
    </ContactUsFilterContext.Provider>
  );
};

export default ContactUsFilterProvider;
