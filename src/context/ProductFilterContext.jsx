import React, { useState,useContext } from 'react';
import { createContext } from 'react';

const INITIAL_PRODUCT_FILTER = {
    product:"",//id veya isim tam bilemiyorum
    airport:"",
    productName:"",
    category:"",
    //amount:"", bir sayıdan fazla olanları görmek için filan kullanılabilir
    brand:"",
    minPrice:"",
    maxPrice:"",
    subcategory:"",
    gender:"",

    //bu ikisi stock details tablosundan
    color:"",
    size:"",

    /**amount, current price, stock detailden amount, active amount  ve photos yok */
  }


const ProductFilterContext = createContext();

export default function ProductFilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_PRODUCT_FILTER);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };


  return (
    <ProductFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </ProductFilterContext.Provider>
  );
}

export const useProductFilter = () => useContext(ProductFilterContext);