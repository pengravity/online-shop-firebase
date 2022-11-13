import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import { Home, Contact, Register, Login, Reset, Admin } from './pages';
import { Header, Footer } from './components';
import AdminOnly from './components/adminPanel/AdminOnly';
import ProductDetails from './components/product/productDetails/ProductDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset' element={<Reset />} />

          <Route
            path='/admin/*'
            element={
              <AdminOnly>
                <Admin />
              </AdminOnly>
            }
          />

          <Route path='/product-details/:id' element={<ProductDetails />} />
        </Routes>

        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
