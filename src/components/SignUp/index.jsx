import React, { useState } from 'react';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';

import { AuthContext } from '../../providers/auth'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import styles from './styles.module.scss';
import { useCallback } from 'react';

const SignUp = () => {

  const { isLogin } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleChangeName = useCallback(
    (event) => {
      setName(event.target.value)
    },
    []
  )
  const handleChangeEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    []
  );
  const handleChangePassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    []
  );
  const handleCloseAlert = useCallback(
    () => {
      setOpenAlert(false)
    },
    []
  );

  const signUp = useCallback(
    () => {
      setIsLoading(true);
      axios.post('/auth/sign-up', { name, email, password })
        .then(res => {
          console.log(res.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setOpenAlert(true);
          setIsLoading(false);
        })
        .finally(() => {
          setName('')
          setEmail('')
          setPassword('')
        })
    },
    [name, email, password]
  )

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.wrapper}>
          <TextField
            value={name}
            onChange={handleChangeName}
            fullWidth
            required
            label="Name"
            variant="outlined"
          />
          <TextField
            value={email}
            onChange={handleChangeEmail}
            fullWidth
            required
            label="Email"
            variant="outlined"
          />
          <TextField
            value={password}
            onChange={handleChangePassword}
            fullWidth
            required
            label="Password"
            variant="outlined"
            type='password'
          />
          <Button
            onClick={signUp}
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            sign up
          </Button>
        </div>
        <div className={styles.footer}>
          <Link to='/login'>to login</Link>
        </div>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          Wong email or password!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUp;
