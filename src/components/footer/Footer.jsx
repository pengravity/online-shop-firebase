import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div>
      <div className={styles.footer}>
        &copy; {year} All Rights Reserved
        <Link to='/contact' className='link'>
          <p>Contact Us</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
