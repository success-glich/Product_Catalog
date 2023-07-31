// src/contexts/BrandContext.js
import React, { createContext, useContext, useReducer, useState } from "react";
import { brandReducer } from "../reducers/brandReducer";
import brandsData from "../assets/data/brandData.json";
import { ADD_BRAND } from "../constants/brandConstants";

const initialState = {
  brands: brandsData.brands,
};

export const BrandContext = createContext();

const BrandContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(brandReducer, initialState);
  const [selectedBrand, setSelectedBrand] = useState("");

  const addBrand = (brand) => {
    dispatch({ type: ADD_BRAND, payload: brand });
  };
  const selectBrand = (brand) => setSelectedBrand(brand);

  return (
    <BrandContext.Provider
      value={{
        ...state,
        selectedBrand,
        selectBrand,
        addBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  return useContext(BrandContext);
};
export default BrandContextProvider;
