import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import styles from './Product.module.scss';
import useFetchCollection from '../../customHooks/useFetchCollection';
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../redux/slices/productSlice';
import Spinner from '../spinner/Spinner';

function Product() {
  const { data, isLoading } = useFetchCollection('products');

  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Spinner /> : <ProductList products={products} />}
        </div>
      </div>
    </section>
  );
}

export default Product;
