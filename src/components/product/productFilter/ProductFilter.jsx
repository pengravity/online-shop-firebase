import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FILTER_BY_CATEGORY } from '../../../redux/slices/filterSlice';
import { selectProducts } from '../../../redux/slices/productSlice';
import styles from './ProductFilter.module.scss';

const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ];
  // console.log(allCategories);

  const filterProducts = (categ) => {
    setCategory(categ);
    dispatch(FILTER_BY_CATEGORY({ products, category: categ }));
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
        {/* <button>All</button> */}
      </div>
      <h4>Price</h4>
      <p>100</p>
      <div className={styles.price}>
        <input type='range' name='price' min='10' max='1000' />
      </div>
      <br />
      <button className='--btn  --btn-danger'>Clear Filter</button>
    </div>
  );
};

export default ProductFilter;
