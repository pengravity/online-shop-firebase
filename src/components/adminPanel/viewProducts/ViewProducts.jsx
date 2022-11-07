import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import { db } from '../../../firebase/config';
import styles from './ViewProducts.module.scss';

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
        console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>View products </h1>
    </div>
  );
};

export default ViewProducts;
