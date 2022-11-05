import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from '../../redux/slices/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../displayLinks/displayLink';

import { ImCart } from 'react-icons/im';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserAlt } from 'react-icons/fa';

import { FaTimes } from 'react-icons/fa';

import './Header.scss';
import AdminPanel from '../adminPanel/AdminOnly';

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

  const dispatch = useDispatch();

  //checking currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;

        // email and pass register users dont have an user name so we are creating one from email
        if (user.displayName === null) {
          const uName = user.email.split('@')[0];
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        // User is signed out
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

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
              <AdminPanel>
                <button className='--btn --btn-primary'>Admin</button>
              </AdminPanel>
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
              <ShowOnLogout>
                <NavLink to='/login' className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href='#home' style={{ color: 'orange' }}>
                  <FaUserAlt size={18} /> Hi, {displayName}
                </a>
                <NavLink to='/order-history' className={activeLink}>
                  My Orders
                </NavLink>

                <NavLink to='/' onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
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
