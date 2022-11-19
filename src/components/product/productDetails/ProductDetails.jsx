import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './ProductDetails.module.scss';
import { db } from '../../../firebase/config';
import Spinner from '../../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TO_CART,
  DECREASE_CART_ITEM,
  CALCULATE_ITEMS_QUANTITY,
  selectCartItems,
} from '../../../redux/slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const currentItem = cartItems.find((cartItem) => cartItem.id === id);

  const isItemInCart = cartItems.findIndex((cartItem) => {
    return cartItem.id === id;
  });

  const getProduct = async () => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error('Product not found ');
    }
  };

  const url = window.location.href;

  const scrollToProducts = () => {
    if (url.includes('details')) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }
  };

  useEffect(() => {
    getProduct();
    scrollToProducts();
  }, []);

  const addToCart = (item) => {
    dispatch(ADD_TO_CART(item));
    dispatch(CALCULATE_ITEMS_QUANTITY());
  };

  const decreaseCartItem = (item) => {
    dispatch(DECREASE_CART_ITEM(item));
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to='/#products'>&larr; Back to products</Link>
        </div>
        {product === null ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>Item ID:</b> {product.id}
                </p>
                <p>
                  {' '}
                  <b>Brand:</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {/* show quantity and +- buttons if item is already in the cart  */}
                  {isItemInCart >= 0 ? (
                    <>
                      {' '}
                      <button
                        className='--btn'
                        onClick={() => decreaseCartItem(product)}
                      >
                        -
                      </button>
                      <p>{<b>{currentItem.cartQuantity}</b>}</p>
                      <button
                        className='--btn'
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  ) : null}
                </div>
                <button
                  className='--btn --btn-danger'
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
