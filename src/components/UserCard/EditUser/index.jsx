import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './styles.module.scss';
import { userEditName, userUploadImage } from '../../../redux/actions/userAction';

const EditUser = () => {

  const FILE_SIZE = 5000000;
  const SUPPORTED_FORMATS = 'image/jpg, image/jpeg, image/gif, image/png';
  
  const dispatch =  useDispatch()

  const [file, setFile] = useState({});

  const handleChangeFile = useCallback(
    (event) => {
      setFile(event.target.files[0])
    }, []
  )

  const handleSendFile = useCallback(
    () => {
      const formData = new FormData();
      formData.append(
        'image',
        file
      );
      dispatch(userUploadImage(formData));
    },
    [file, dispatch]
  )

  const handleChangeName = values => dispatch(userEditName(values))

  const validationSchemaName = yup.object().shape({
    name: yup.string().min(3, 'Name is to short').max(10, 'Name is to large'),
  });

  return (
    <>
      <h1>Edit user data</h1>
      <div className={styles.wrapper} >
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchemaName}
          validateOnBlur
        onSubmit={(values) => handleChangeName(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue }) => (
            <div className={styles.input}>
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
                InputLabelProps={{ shrink: true }}
                helperText={!dirty && touched.name && errors.name}
                error={touched.name && errors.name ? true : false}
                onBlur={handleBlur}
              />
              <Button
                onClick={handleSubmit}
                variant='contained'
                color='primary'
                disabled={!isValid}
                type='submit'
              >
                edit
              </Button>
            </div>
          )}
        </Formik>
        <div className={styles.input}>
          <TextField
            className={styles.inputsGroup}
            name='file'
            onChange={handleChangeFile}
            fullWidth
            required
            variant="outlined"
            label='New avatar'
            InputLabelProps={{ shrink: true }}
            type='file'
            inputProps={{
              accept: SUPPORTED_FORMATS,
              multiple: false,
              size: FILE_SIZE
            }}

          />
          <Button
            onClick={handleSendFile}
            variant='contained'
            color='primary'
            type='submit'
            disabled={!!file?.name ? false : true}
          >
            edit
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditUser;
