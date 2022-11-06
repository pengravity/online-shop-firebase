import { Routes, Route } from 'react-router-dom';

import styles from './Admin.module.scss';
import AdminNavbar from '../../components/adminPanel/AdminNavbar';
import ViewProducts from '../../components/adminPanel/ViewProducts';
import AddProducts from '../../components/adminPanel/AddProducts';
import Orders from '../../components/adminPanel/Orders';
import AdminHome from '../../components/adminPanel/AdminHome';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<AdminHome />} />
          <Route path='all-products' element={<ViewProducts />} />
          <Route path='add-products' element={<AddProducts />} />
          <Route path='orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
