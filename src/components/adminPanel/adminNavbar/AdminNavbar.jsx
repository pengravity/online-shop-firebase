import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

import styles from './AdminNavbar.module.scss';
import { selectUserName } from '../../../redux/slices/authSlice';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const AdminNavbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserAlt size={40} color='#fff' />
        <h4> {userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/admin/home' className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/all-products' className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-products/ADD' className={activeLink}>
              Add products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
