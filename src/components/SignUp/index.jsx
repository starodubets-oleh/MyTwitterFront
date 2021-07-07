import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import { Formik } from 'formik';
import * as yup from 'yup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { userRegistration } from '../../redux/actions/userAction';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getLocalStorageUser } from '../../utils/localStorageHelpers';

import styles from './styles.module.scss';

const SignUp = () => {

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().min(2).max(10).required('Required'),
    email: yup.string().email('Email must be a valid email!').required('Required'),
    password: yup.string().typeError('Only as a string').min(8, 'short password').max(20, 'long password').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password mismatch').required('Required')
  })

  const history = useHistory();

  useEffect(
    () => {
      if (getLocalStorageUser()) {
        history.push('/')
      }
    },
    [history],
  );

  const signUp = useCallback(
    (values, resetForm) => {
      dispatch(userRegistration(values))
      resetForm({});
    },
    [dispatch]
  )

  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.title}>Sign Up</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={(values, { resetForm }) => signUp(values, resetForm)}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
            <div className={styles.wrapper}>
              <TextField
                className={styles.inputsGroup}
                type='text'
                name='name'
                value={values.name}
                onChange={handleChange}
                fullWidth
                required
                label="Name"
                variant="outlined"
                helperText={dirty && touched.name && errors.name}
                error={dirty && touched.name && errors.name}
                onBlur={handleBlur}
              />
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
              <TextField
                className={styles.inputsGroup}
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                label="Password"
                variant="outlined"
                type='password'
                helperText={dirty && touched.confirmPassword && errors.confirmPassword}
                error={dirty && touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur}
              />
              <Button
                onClick={handleSubmit}
                variant='contained'
                color='primary'
                disabled={!isValid}
                type='submit'
              >
                sign up
              </Button>
            </div>
          )}
        </Formik>
        <div className={styles.footer}>
          <Link to='/login'>to login</Link>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
}

export default SignUp;
