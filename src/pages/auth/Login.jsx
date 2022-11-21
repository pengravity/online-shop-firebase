import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GrGoogle } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { auth } from '../../firebase/config';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import Spinner from '../../components/spinner/Spinner';
import { selectPreviousURL } from '../../redux/slices/cartSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const previousURL = useSelector(selectPreviousURL);

  const redirectUser = () => {
    if (previousURL.includes('cart')) {
      return navigate('/cart');
    } else {
      navigate('/');
    }
  };

  const loginUser = (e) => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success('User logged in!');
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Sign-in successful');
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Spinner />}

      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type='text'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='--btn --btn-primary --btn-block'>Login</button>
              <div className={styles.links}>
                <Link to='/reset'>Reset Password</Link>
              </div>
              <p>-- or --</p>

              <button
                type='submit'
                className='--btn --btn-danger --btn-block'
                onClick={signInWithGoogle}
              >
                <GrGoogle /> &nbsp; Login With Google
              </button>
              <span className={styles.register}>
                <p className='black'>Don't have an account?</p>&nbsp;
                <Link to='/register'>Register</Link>
              </span>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
