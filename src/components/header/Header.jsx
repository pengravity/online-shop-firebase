import { Link } from 'react-router-dom';
import { useState } from 'react';

import { ImCart } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';

import './Header.scss';

const logo = (
  <div className='logo'>
    <Link to='/'>
      <h3>
        <span>Online Shop</span>
      </h3>
    </Link>
  </div>
);

const cart = (
  <span className='cart'>
    <Link to='/cart'>
      Cart
      <ImCart size={22} />
      <p>0</p>
    </Link>
  </span>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className='header'>
        {logo}
        <nav className={showMenu ? 'show-nav' : 'hide-nav'}>
          <div
            className={
              showMenu ? 'nav-wrapper show-nav-wrapper' : 'nav-wrapper'
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className='logo-mobile'>
              {logo}
              <FaTimes size={24} onClick={hideMenu} />
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/contact'>Contact Us</Link>
            </li>
          </ul>
          <div className='header-right' onClick={hideMenu}>
            <span className='links'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
              <Link to='/order-history'>My Orders</Link>
            </span>
            {cart}
          </div>
        </nav>
        <div className='menu-icon'>
          {cart}
          <GiHamburgerMenu size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
