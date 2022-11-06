import { useState } from 'react';
import Card from '../../card/Card';

import styles from './AddProducts.module.scss';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Smartphones' },
  { id: 3, name: 'Gadgets' },
  { id: 4, name: 'Board Games' },
];

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: '',
    imageURL: '',
    price: null,
    category: '',
    brand: '',
    desc: '',
  });

  const handleInputChange = () => {};

  const handleImageChange = () => {};

  return (
    <div className={styles.product}>
      <h1>Add Products</h1>
      <Card cardClass={styles.card}>
        <form>
          <label>Product name:</label>
          <input
            type='text'
            placeholder='Product name'
            required
            name='name'
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles['progres-bar']} style={{ width: '50%' }}>
                Uploading 50%
              </div>
            </div>
            <input
              type='file'
              placeholder='Product Image'
              accept='image/*'
              name='image'
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type='text'
              required
              name='imageURL'
              disabled
              value={product.imageURL}
            />
          </Card>
          <label>Product price:</label>
          <input
            type='number'
            placeholder='Product price'
            required
            name='price'
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product category:</label>

          <select
            name='category'
            required
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value='' disabled>
              -- Choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          <label>Product Company/Brand:</label>
          <input
            type='text'
            placeholder='Product brand'
            required
            name='brand'
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product description:</label>
          <textarea
            name='desc'
            value={product.desc}
            required
            onChange={(e) => handleInputChange(e)}
            cols='10'
            rows='10'
          ></textarea>
          <button className='--btn --btn-primary'>Save</button>
        </form>
      </Card>
    </div>
  );
};

export default AddProducts;
