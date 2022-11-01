import { Link } from 'react-router-dom';

import { ImCart } from 'react-icons/im';

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
  return (
    <header>
      <div className='header'>{logo}</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/contact'>Contact Us</Link>
          </li>
        </ul>
        <div className='header-right'>
          <span className='links'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link to='/order-history'>My Orders</Link>
          </span>
          {cart}
        </div>
      </nav>
    </header>
  );
};

export default Header;
