import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

import Card from '../../components/card/Card';
import Spinner from '../../components/spinner/Spinner';

import './auth.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success('User registered!');
        navigate('/login');
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
        // ..
      });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <section className='container auth'>
        <Card>
          <div className='form'>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
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
              <input
                type='password'
                placeholder='Confirm Password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>
                Register
              </button>

              <span className='register'>
                <p className='black'>Have an account?</p>&nbsp;
                <Link to='/login'>Login</Link>
              </span>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Register;
