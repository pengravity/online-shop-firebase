import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from '../../../redux/slices/filterSlice';
import {
  selectProducts,
  selectMinPrice,
  selectMaxPrice,
} from '../../../redux/slices/productSlice';
import styles from './ProductFilter.module.scss';

const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const [filterPrice, setFilterPrice] = useState(3000);

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ];

  const filterProducts = (categ) => {
    setCategory(categ);
    dispatch(FILTER_BY_CATEGORY({ products, category: categ }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, filterPrice }));
  }, [dispatch, products, filterPrice]);

  const clearFilters = () => {
    setCategory('All');
    setFilterPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((categ, index) => {
          return (
            <button
              key={index}
              type='button'
              className={`${category}` === categ ? `${styles.active}` : null}
              onClick={() => filterProducts(categ)}
            >
              {categ}
            </button>
          );
        })}
      </div>
      <br />
      <h4>max Price:</h4>
      <p>${filterPrice}</p>
      <div className={styles.price}>
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
      </div>
      <br />
      <button className='--btn  --btn-danger' onClick={clearFilters}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
