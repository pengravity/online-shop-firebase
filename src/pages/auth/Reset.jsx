import { Link } from 'react-router-dom';

import Card from '../../components/card/Card';

import './auth.scss';

const Reset = () => {
  return (
    <section className='container auth'>
      <Card>
        <div className='form'>
          <h2>Reset Password</h2>

          <form>
            <input type='text' placeholder='Email' required />

            <button className='--btn --btn-primary --btn-block'>
              Reset Password
            </button>

            <span className='links'>
              <p>
                <Link to='/login'>Login</Link>
              </p>
              <p>
                <Link to='/register'>Register</Link>
              </p>
            </span>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
