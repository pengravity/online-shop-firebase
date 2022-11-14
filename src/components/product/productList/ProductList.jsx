import { useState, useEffect } from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from '../../../redux/slices/filterSlice';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import styles from './ProductList.module.scss';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [products, search]);

  return (
    <div className={styles['product-list']} id='product'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={24}
            color='orangered'
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color='#0066d4' onClick={() => setGrid(false)} />
          <p>
            {filteredProducts.length > 1
              ? ` ${filteredProducts.length} products found`
              : `${filteredProducts.length} product found`}
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by: </label>
          <select>
            <option value='newest'>Newest</option>
            <option value='price-low-high'>Price: low to high</option>
            <option value='price-high-low'>Price: high to low</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No products found...</p>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
