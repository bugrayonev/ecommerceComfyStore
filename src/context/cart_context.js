import React, { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
const getLocalStorage = ()=> {
  return  localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : []
  
}
const initialState = {
  cart:getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  add to cart
  const addToCart = (id, color, amount, product) => {
    console.log(id, color, amount, product);
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  
  // renove item
  const removeItem = (id) => {
    console.log(id);
    dispatch({type:REMOVE_CART_ITEM,payload:id})
  };

  // toggle Amount
  const toggleAmount = (id, value) => {
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT,payload:{id,value}})
  };

  // clear cart
  const clearCart = () => {
    dispatch({type:CLEAR_CART})
  };

  useEffect(() => {
    dispatch({type:COUNT_CART_TOTALS})
    localStorage.setItem("cart", JSON.stringify(state.cart));
    // eslint-disable-next-line
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
