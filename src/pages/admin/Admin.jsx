import { Routes, Route } from 'react-router-dom';

import './Admin.scss';
import AdminNavbar from '../../components/adminPanel/AdminNavbar';
import ViewProducts from '../../components/adminPanel/ViewProducts';
import AddProducts from '../../components/adminPanel/AddProducts';
import Orders from '../../components/adminPanel/Orders';

import Home from '../home/Home';

const Admin = () => {
  return (
    <div className='admin'>
      <div className='navbar'>
        <AdminNavbar />
      </div>
      <div className='content'>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='all-products' element={<ViewProducts />} />
          <Route path='add-products' element={<AddProducts />} />
          <Route path='orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
