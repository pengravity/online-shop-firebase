import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './ProductDetails.module.scss';
import { db } from '../../../firebase/config';
import Spinner from '../../spinner/Spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      const obj = {
        id,
        ...docSnap.data(),
      };
      // console.log(obj);
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
                  <button className='--btn'>-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className='--btn'>+</button>
                </div>
                <button className='--btn --btn-danger'>Add To Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
