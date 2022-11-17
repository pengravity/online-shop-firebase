import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiShow } from 'react-icons/bi';

import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import styles from './Product.module.scss';
import useFetchCollection from '../../customHooks/useFetchCollection';
import {
  selectProducts,
  STORE_PRODUCTS,
  GET_PRICE_RANGE,
} from '../../redux/slices/productSlice';
import Spinner from '../spinner/Spinner';

function Product() {
  const { data, isLoading } = useFetchCollection('products');
  const [showFilter, setShowFilter] = useState(false);

  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Spinner /> : <ProductList products={products} />}
          <div className={styles.icon} onClick={toggleFilter}>
            <BiShow size={20} color='orangered' />
            <p>
              {' '}
              <b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
