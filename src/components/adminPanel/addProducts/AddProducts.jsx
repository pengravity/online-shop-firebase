import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import Spinner from '../../spinner/Spinner';
import { storage, db } from '../../../firebase/config';
import Card from '../../card/Card';
import styles from './AddProducts.module.scss';
import { toast } from 'react-toastify';
import { selectProducts } from '../../../redux/slices/productSlice';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Smartphones' },
  { id: 3, name: 'Gadgets' },
  { id: 4, name: 'Board Games' },
];
const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
};

const AddProducts = () => {
  const { id } = useParams();

  const products = useSelector(selectProducts);
  console.log(products, 'products');

  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit, 'productEdit');

  const detectForm = (id, option1, option2) => {
    if (id === 'ADD') {
      return option1;
    } else {
      return option2;
    }
  };

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success('Image uploaded');
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate().toString(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success('product uploaded');
      navigate('/admin/all-products');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className={styles.product}>
        <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
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
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles['progress-bar']}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload completed ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type='file'
                placeholder='Product Image'
                accept='image/*'
                name='image'
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === '' ? null : (
                <input
                  type='text'
                  required
                  placeholder='Image URL'
                  name='imageURL'
                  disabled
                  value={product.imageURL}
                />
              )}
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
            <button className='--btn --btn-primary'>
              {' '}
              {detectForm(id, 'Save Product', 'Edit Product')}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProducts;
