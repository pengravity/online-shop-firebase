import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
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

import styles from './Header.module.scss';
import AdminOnly from '../adminPanel/AdminOnly';
import { AdminOnlyLink } from '../adminPanel/AdminOnly';
import {
  CALCULATE_ITEMS_QUANTITY,
  selectCartTotalQuantity,
} from '../../redux/slices/cartSlice';

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h3>
        <span>Online Shop</span>
      </h3>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_ITEMS_QUANTITY());
  }, []);

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener('scroll', fixNavbar);

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

  const cart = (
    <span className={styles.cart}>
      <Link to='/cart'>
        Cart
        <ImCart size={22} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={24} onClick={hideMenu} />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to='/admin/home'>
                  <button className='--btn --btn-primary'>Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>

            <li>
              <NavLink to='/' end className={activeLink}>
                Home
              </NavLink>
            </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
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

                <NavLink to='/' onClick={logoutUser} end>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles['menu-icon']}>
          {cart}
          <GiHamburgerMenu size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
