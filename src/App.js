import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import { Home, Contact, Register, Login, Reset } from './pages';
import { Header, Footer } from './components';

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
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
