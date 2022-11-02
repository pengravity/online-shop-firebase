import { Link } from 'react-router-dom';
import { GrGoogle } from 'react-icons/gr';

import Card from '../../components/card/Card';

import './auth.scss';

const Register = () => {
  return (
    <section className='container auth'>
      <Card>
        <div className='form'>
          <h2>Register</h2>

          <form>
            <input type='text' placeholder='Email' required />
            <input type='password' placeholder='Password' required />
            <input type='password' placeholder='Confirm Password' required />
            <button className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>

          <span className='register'>
            <p className='black'>Have an account?</p>&nbsp;
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Register;
