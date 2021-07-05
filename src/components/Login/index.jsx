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

const Login = () => {

  const { isLogin } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleChangeEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    []
  )
  const handleChangePassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    []
  );
  const handleCloseAlert = useCallback(
    (event) => {
      setOpenAlert(event.target.value);
    },
    []
  );

  const login = () => {
    setIsLoading(true);

    axios.post(`/auth/login`, { email, password })
      .then(res => {
        const {data} = res.data;
        localStorage.setItem('token', JSON.stringify(data));
        setIsLoading(false);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        setOpenAlert(true);
        setIsLoading(false);
      });
  };

  if (isLogin) {
    return <Redirect to="/" />;
  };

  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.wrapper}>
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
            onClick={login}
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            sign in
          </Button>
        </div>
        <div className={styles.footer}>
          <Link to='/sign-up'>to sign up</Link>
        </div>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          Wong email or password!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
