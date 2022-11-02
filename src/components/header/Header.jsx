import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import { toast } from 'react-toastify';
import { ImCart } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserAlt } from 'react-icons/fa';

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

const activeLink = ({ isActive }) => (isActive ? 'active' : '');

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  //checking currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.displayName);
        setDisplayName(user.displayName);
      } else {
        // User is signed out
        setDisplayName('');
      }
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('user logged out');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
              <NavLink to='/' end className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className='header-right' onClick={hideMenu}>
            <span className='links'>
              <NavLink to='/login' className={activeLink}>
                Login
              </NavLink>
              <a href='#'>
                <FaUserAlt size={18} /> Hi, {displayName}
              </a>
              <NavLink to='/register' className={activeLink}>
                Register
              </NavLink>
              <NavLink to='/order-history' className={activeLink}>
                My Orders
              </NavLink>
              <NavLink to='/' onClick={logoutUser}>
                Logout
              </NavLink>
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
