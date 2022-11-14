import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase() ||
              product.category.toLowerCase().includes(search.toLowerCase())
          )
      );
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];

      switch (sort) {
        case 'newest': {
          tempProducts = products;
          break;
        }

        case 'price-low-high': {
          tempProducts = [...products].sort((a, b) => {
            return a.price - b.price;
          });
          break;
        }

        case 'price-high-low': {
          tempProducts = [...products].sort((a, b) => {
            return b.price - a.price;
          });
          break;
        }

        default: {
          return state;
        }
      }
      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
