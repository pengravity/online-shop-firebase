import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {
  ADD_TO_CART,
  DECREASE_CART_ITEM,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalToPay,
} from '../../redux/slices/cartSlice';
import styles from './Cart.module.scss';
import Card from '../../components/card/Card';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalToPay = useSelector(selectCartTotalToPay);

  const dispatch = useDispatch();

  const increaseCount = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const decreaseCount = (item) => {
    dispatch(DECREASE_CART_ITEM(item));
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
                        <RiDeleteBin5Line size={20} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className='--btn --btn-danger'> Clear Cart</button>

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
                  <button className='--btn --btn-primary --btn-block'>
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
