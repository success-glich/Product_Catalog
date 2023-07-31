import {
  ADD_PRODUCT,
  CLEAR_SEARCH,
  DELETE_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_PRODUCT,
} from "../constants/productConstants";
import { initialProductState } from "../contexts/ProductContext";

export const productReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const { brand, productName } = action.payload;
      return {
        ...state,
        [brand]: [...(state[brand] || []), productName],
      };
    case DELETE_PRODUCT:
      const { brand: deleteBrand, productName: deleteProductName } =
        action.payload;
      return {
        ...state,
        [deleteBrand]: state[deleteBrand].filter(
          (product) => product !== deleteProductName
        ),
      };
    case UPDATE_PRODUCT:
      const {
        brand: updateBrand,
        oldProductName,
        newProductName,
      } = action.payload;
      const updatedProducts = state[updateBrand].map((product) =>
        product === oldProductName ? newProductName : product
      );
      return {
        ...state,
        [updateBrand]: updatedProducts,
      };
    case SEARCH_PRODUCT:
      const { searchTerm, selectedBrand } = action.payload;
      if (searchTerm === "" && !selectedBrand) {
        return { ...state };
      }

      const searchResults = {};
      if (selectedBrand) {
        const filteredProducts = state[selectedBrand]?.filter((product) =>
          product.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredProducts && filteredProducts.length > 0) {
          searchResults[selectedBrand] = filteredProducts;
        }
      } else {
        for (const brand of Object.keys(state)) {
          const filteredProducts = state[brand]?.filter((product) =>
            product.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredProducts && filteredProducts.length > 0) {
            searchResults[brand] = filteredProducts;
          }
        }
      }
      return searchResults;
    case CLEAR_SEARCH:
      return initialProductState;
    default:
      return state;
  }
};
