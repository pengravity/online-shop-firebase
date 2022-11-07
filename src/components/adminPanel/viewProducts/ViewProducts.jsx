import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Notiflix from 'notiflix';

import { db, storage } from '../../../firebase/config';
import styles from './ViewProducts.module.scss';
import Spinner from '../../spinner/Spinner';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducs();
  }, []);

  const getProducs = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const deleteConfirmation = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete item',
      'do you want to delete this item?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {},
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: 'red',
        okButtonBackground: 'red',
        cssAnimationStyle: 'zoom',
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'products', id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Item deleted');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className={styles.table}>
        <h2>All products </h2>
        {products.length === 0 ? (
          <p>No products found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, imageURL, price, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: '120px', height: '120px' }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>${price}</td>
                    <td className={styles.icons}>
                      <Link to='/admin/add-product'>
                        <FaEdit size={18} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={16}
                        color='red'
                        onClick={() => deleteConfirmation(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
