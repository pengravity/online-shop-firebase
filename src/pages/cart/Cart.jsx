import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri';

import {
  ADD_TO_CART,
  DECREASE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_TO_PAY,
  CALCULATE_ITEMS_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalToPay,
  SAVE_URL,
} from '../../redux/slices/cartSlice';
import styles from './Cart.module.scss';
import Card from '../../components/card/Card';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalToPay = useSelector(selectCartTotalToPay);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseCount = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const decreaseCount = (item) => {
    dispatch(DECREASE_CART_ITEM(item));
  };

  const removeFromCart = (item) => {
    dispatch(REMOVE_FROM_CART(item));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_TO_PAY());
    dispatch(CALCULATE_ITEMS_QUANTITY());
    dispatch(SAVE_URL(''));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate('/checkout-details');
    } else {
      dispatch(SAVE_URL(url));
      navigate('/login');
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        {' '}
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is empty</p>
            <div>
              <Link to='/#products'>&larr; Back to Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const { id, name, price, imageURL, cartQuantity } = item;
                  return (
                    <tr key={id}>
                      <td>
                        <p> {name}</p>
                        <img src={imageURL} alt='item' width={100} />
                      </td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className='--btn'
                            onClick={() => decreaseCount(item)}
                          >
                            -
                          </button>
                          <p> {cartQuantity}</p>
                          <button
                            className='--btn'
                            onClick={() => increaseCount(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{price}</td>
                      <td>{(cartQuantity * price).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <RiDeleteBin5Line
                          size={20}
                          onClick={() => removeFromCart(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className='--btn --btn-danger' onClick={clearCart}>
                {' '}
                Clear Cart
              </button>

              <div className={styles.checkout}>
                <div>
                  <Link to='/#products'>&larr; Back To Shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>{`cart items: ${cartTotalQuantity}`}</p>
                  <div className={styles.text}>
                    <h4>{`Total for items: $${cartTotalToPay.toFixed(2)}`}</h4>
                  </div>
                  <p>Delivery from $10</p>
                  <button
                    className='--btn --btn-primary --btn-block'
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
