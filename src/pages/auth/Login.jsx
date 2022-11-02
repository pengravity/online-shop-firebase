import { Link } from 'react-router-dom';
import { GrGoogle } from 'react-icons/gr';

import Card from '../../components/card/Card';
import './auth.scss';

const Login = () => {
  return (
    <section className='container auth'>
      <Card>
        <div className='form'>
          <h2>Login</h2>

          <form>
            <input type='text' placeholder='Email' required />
            <input type='password' placeholder='Password' required />
            <button className='--btn --btn-primary --btn-block'>Login</button>
            <div className='links'>
              <Link to='/reset'>Reset Password</Link>
            </div>
            <p>-- or --</p>

            <button className='--btn --btn-danger --btn-block'>
              <GrGoogle /> &nbsp; Login With Google
            </button>
            <span className='register'>
              <p className='black'>Don't have an account?</p>&nbsp;
              <Link to='/register'>Register</Link>
            </span>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Login;
