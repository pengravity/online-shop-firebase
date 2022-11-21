import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '../../card/Card';
import styles from './ProductItem.module.scss';
import {
  ADD_TO_CART,
  CALCULATE_ITEMS_QUANTITY,
} from '../../../redux/slices/cartSlice';
const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const shortenText = (text, numOfLetters) => {
    if (text.length > numOfLetters) {
      const shortenedText = text.substring(0, numOfLetters).concat('...');
      return shortenedText;
    }
    return text;
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_ITEMS_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img
            src={imageURL}
            alt={name}
            // style={{ width: '120px', height: '120px' }}
          />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <h4>{shortenText(name, 18)}</h4>
          <p>{`$${price}`}</p>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 180)}</p>}
        <button
          className='--btn --btn-danger'
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
