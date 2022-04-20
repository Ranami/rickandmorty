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
      const existedBasketItem = newState.basket.find(
        (product) => product.product.id === action.payload.id
      );
      if (existedBasketItem) {
        existedBasketItem.count++;
        newState.basket = [...newState.basket];
      } else {
        newState.basket = [
          ...newState.basket,
          { product: action.payload, count: 1 },
        ];
      }

      break;
    case REMOVE_FROM_BASKET:
      console.log(action.payload);
      newState.basket = state.basket.filter(
        (item) => item.product.id !== action.payload
      );
      break;
    default:
      return state;
  }
  localStorage.setItem("basket", JSON.stringify(newState.basket));
  return newState;
}
