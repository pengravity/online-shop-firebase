import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/slices/authSlice';

const AdminOnly = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  }
  return (
    <section style={{ height: '80vh' }}>
      <div className='container'>
        <h2>Permission denied</h2>
        <p>This page can only be view by an admin user</p>
        <br />
        <Link to='/'>
          <button className='--btn'>&larr; Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  }
  return null;
};

export default AdminOnly;
