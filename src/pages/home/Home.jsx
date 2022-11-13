import { useEffect } from 'react';
import AdminOnly from '../../components/adminPanel/AdminOnly';
import Product from '../../components/product/Product';
import Slider from '../../components/slider/Slider';

const Home = () => {
  const url = window.location.href;

  const scrollToProducts = () => {
    if (url.includes('#products')) {
      window.scrollTo({
        top: 1000,
        behavior: 'smooth',
      });
      return;
    }
  };

  useEffect(() => {
    scrollToProducts();
  }, []);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
