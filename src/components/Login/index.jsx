import React, { useState, useCallback, useContext } from 'react';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../../providers/auth'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import styles from './styles.module.scss';

const Login = () => {

  const { isLogin } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState({ status: false, message: '' });

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email must be a valid email!').required('Required'),
    password: yup.string().typeError('Only as a string').required('Required')
  })
  const handleCloseAlert = useCallback(
    () => {
      setOpenAlert({ status: false, message: '' });
    },
    []
  );

  const login = useCallback(
    ({ email, password }) => {
      console.log({ email, password });
      setIsLoading(true);

      axios.post('/user/login', { email, password })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          setIsLoading(false);
          window.location.reload();
        })
        .catch(error => {
          console.dir(error);
          setOpenAlert({ status: true, message: error.response.data.message });
          setIsLoading(false);
        });
    },
    []
  )

  if (isLogin) {
    return <Redirect to="/" />;
  };

  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.title}>Sign In</h1>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={(values) => login(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
            <div className={styles.wrapper}>
              <TextField
                className={styles.inputsGroup}
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                fullWidth
                required
                label="Email"
                variant="outlined"
                helperText={dirty && touched.email && errors.email}
                error={dirty && touched.email && errors.email}
                onBlur={handleBlur}
              />
              <TextField
                className={styles.inputsGroup}
                name='password'
                value={values.password}
                onChange={handleChange}
                fullWidth
                required
                label="Password"
                variant="outlined"
                type='password'
                helperText={dirty && touched.password && errors.password}
                error={dirty && touched.password && errors.password}
                onBlur={handleBlur}
              />
              <Button
                onClick={handleSubmit}
                variant='contained'
                color='primary'
                disabled={!isValid || isLoading}
                type='submit'
              >
                sign in
              </Button>
            </div>
          )}
        </Formik>
        <div className={styles.footer}>
          <Link to='/sign-up'>to sign up</Link>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlert.status}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          variant="filled"
          onClose={handleCloseAlert}
          severity="error"
        >
          {openAlert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
