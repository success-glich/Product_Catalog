import React, { createContext, useContext, useReducer, useState } from "react";
import { productReducer } from "../reducers/productReducer";
import {
  ADD_PRODUCT,
  CLEAR_SEARCH,
  DELETE_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_PRODUCT,
} from "../constants/productConstants";

export const initialProductState = {
  Apple: ["iphone12"],
  Samsung: ["samsung a71", "samsung a30"],
};

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  const addProduct = (brand, productName) => {
    dispatch({ type: ADD_PRODUCT, payload: { brand, productName } });
  };

  const deleteProduct = (brand, productName) => {
    dispatch({ type: DELETE_PRODUCT, payload: { brand, productName } });
  };

  const updateProduct = (brand, oldProductName, newProductName) => {
    dispatch({
      type: UPDATE_PRODUCT,
      payload: { brand, oldProductName, newProductName },
    });
  };
  const searchProduct = (searchTerm, selectedBrand) => {
    dispatch({
      type: SEARCH_PRODUCT,
      payload: { searchTerm, selectedBrand },
    });
  };
  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state,
        addProduct,
        deleteProduct,
        searchProduct,
        updateProduct,
        clearSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductContextProvider;
