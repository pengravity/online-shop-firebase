import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        // item in the cart -> increase cartQuantity of the item
        state.cartItems[productIndex].cartQuantity += 1;
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

      //   state.cartTotalQuantity++;
      //   state.cartTotalAmount += action.payload.price;
      //   console.log(state.cartTotalQuantity, state.cartTotalAmount);
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
