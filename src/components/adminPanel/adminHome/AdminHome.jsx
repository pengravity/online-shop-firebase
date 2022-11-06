import styles from './AdminHome.module.scss';

import AdminOnly from '../AdminOnly';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin home</h1>
      <AdminOnly />
    </div>
  );
};

export default AdminHome;
