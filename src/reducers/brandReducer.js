import { ADD_BRAND } from "../constants/brandConstants";

export const brandReducer = (state, action) => {
  switch (action.type) {
    case ADD_BRAND:
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    default:
      return state;
  }
};
