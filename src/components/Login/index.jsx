import React, { useState, useCallback, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router";

import {userLogin} from '../../redux/actions/userAction'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import styles from './styles.module.scss';
import { getLocalStorageUser } from '../../utils/localStorageHelpers';

const Login = () => {

  const dispatch = useDispatch();

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

  const history = useHistory();

  useEffect(() => {
    if (getLocalStorageUser()) {
      history.push('/')
    }
  }, [history]);

  const login = useCallback(
    (values) => {
      dispatch(userLogin(values))
      history.push('/')
    },
    [dispatch, history]
  )

  return (
    <>
      <form className={styles.login}>
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
                disabled={!isValid}
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
      </form>
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
