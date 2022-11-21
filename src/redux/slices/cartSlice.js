import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalToPay: 0,
  previousURL: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        // item in the cart -> increase cartQuantity of the item
        state.cartItems[productIndex].cartQuantity += 1;
        toast.success(`Increased quantity`, {
          position: 'top-left',
        });
      } else {
        // item not in the cart -> add it to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} Added to the cart`, {
          position: 'top-left',
        });
      }
      // save cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    DECREASE_CART_ITEM(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`Quantity decreased `, {
          position: 'top-left',
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        toast.error(`${action.payload.name} Removed from the cart`, {
          position: 'top-left',
        });
        const newCartItems = state.cartItems.filter(
          (element) => element.id !== action.payload.id
        );
        state.cartItems = newCartItems;
      }
      // save cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItems = state.cartItems.filter(
        (element) => element.id !== action.payload.id
      );
      state.cartItems = newCartItems;
      toast.error(`${action.payload.name} Removed from the cart`, {
        position: 'top-left',
      });
      // save cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.error(`All items deleted from the cart`, {
        position: 'top-left',
      });
    },
    CALCULATE_TOTAL_TO_PAY(state, action) {
      const arr = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const payForItem = price * cartQuantity;
        return arr.push(payForItem);
      });
      const total = arr.reduce((acc, current) => {
        return acc + current;
      }, 0);
      state.cartTotalToPay = total;
    },
    CALCULATE_ITEMS_QUANTITY(state, action) {
      const arr = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        return arr.push(cartQuantity);
      });
      const total = arr.reduce((acc, current) => {
        return acc + current;
      }, 0);
      state.cartTotalQuantity = total;
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_TO_PAY,
  CALCULATE_ITEMS_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalToPay = (state) => state.cart.cartTotalToPay;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
