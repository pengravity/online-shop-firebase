import { useState } from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import Search from '../../search/Search';

import styles from './ProductList.module.scss';

const ProductList = () => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');

  console.log(search);

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
          <p>15 Products found</p>
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
    </div>
  );
};

export default ProductList;
