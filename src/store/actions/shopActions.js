import axios from "axios";

export const SET_PRODUCTS = "shop/setProducts";
export const ADD_TO_BASKET = "shop/addToBasket";
export const REMOVE_FROM_BASKET = "shop/removeFromBasket";
export const INCREMENT_BASKET = "shop/incrementBasket";
export const DECREMENT_BASKET = "shop/decrementBasket";

export const fetchProducts = () => (dispatch) => {
  axios.get("https://fakestoreapi.com/products").then((res) => {
    dispatch({ type: SET_PRODUCTS, payload: res.data });
  });
};

export const addToBasket = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: product,
  });
};

export const incrementBasket = (product) => (dispatch) => {
  dispatch({
    type: INCREMENT_BASKET,
    payload: product,
  });
};
export const decrementBasket = (product) => (dispatch) => {
  dispatch({
    type: DECREMENT_BASKET,
    payload: product,
  });
};

export const removeFromBasket = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_BASKET,
    payload: id,
  });
};
