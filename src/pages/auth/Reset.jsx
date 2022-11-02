import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';

import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import Spinner from '../../components/spinner/Spinner';

import './auth.scss';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Reset password email sent ');
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className='container auth'>
        <Card>
          <div className='form'>
            <h2>Reset Password</h2>

            <form onSubmit={resetPassword}>
              <input
                type='text'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type='submit' className='--btn --btn-primary --btn-block'>
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
    </>
  );
};

export default Reset;
