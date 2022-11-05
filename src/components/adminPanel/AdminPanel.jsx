import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slices/authSlice';

const AdminPanel = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) {
    return children;
  }
  return null;
};

export default AdminPanel;
