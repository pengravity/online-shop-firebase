import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { Home, Contact } from './pages';
import { Header, Footer } from './components';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
