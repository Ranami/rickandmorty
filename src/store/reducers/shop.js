import {
  SET_PRODUCTS,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
} from "../actions/shopActions";

const initState = {
  products: [],
  basket: JSON.parse(localStorage.getItem("basket")) || [],
};

export function shop(state = initState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_PRODUCTS:
      newState.products = action.payload;
      break;
    case ADD_TO_BASKET:
      newState.basket = [...newState.basket, action.payload];
      break;
    case REMOVE_FROM_BASKET:
      newState.basket = state.basket.filter(
        (item) => item.id !== action.payload
      );
      break;
    default:
      return state;
  }
  localStorage.setItem("basket", JSON.stringify(newState.basket));
  return newState;
}
