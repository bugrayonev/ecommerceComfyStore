// cart_reducer.js
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
  } from "../actions";
  
  const cart_reducer = (state, action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const { id, color, amount, product } = action.payload;
        
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === id && item.color === color
        );
  
        if (existingItemIndex !== -1) {
          // If item with the same id and color exists, increase the amount
          const updatedCart = state.cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, amount: item.amount + amount }
              : item
          );
  
          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          // If item with the same id but different color doesn't exist, add a new item
          return {
            ...state,
            cart: [...state.cart, { id, color, amount, product }],
          };
        }
      }
      // Add other cases if needed (REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, etc.)
  
      default:
        return state;
    }
  };
  
  export default cart_reducer;