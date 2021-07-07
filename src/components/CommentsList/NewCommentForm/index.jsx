import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import * as yup from 'yup';

import { createComment } from '../../../redux/actions/commentsAction'

import { getLocalStorageUserName } from '../../../utils/localStorageHelpers';

import styles from './styles.module.scss';

const NewCommentForm = ({ postId }) => {


  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    comment: yup.string().typeError('Only as a string').min(3, 'short tweet').max(50, 'long tweet').required()
  })

  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    if (getLocalStorageUserName()) {
      const name = getLocalStorageUserName();
      setAvatar([name[0], name[name.length - 1]].join(''))
    }
  }, []);

  const handleSend = useCallback(
    async ({ comment }, { resetForm }) => {
      dispatch(createComment(comment, postId))
      resetForm({})
    },
    [dispatch, postId],
  );

  return (
    <div className={styles.comment}>
      <Avatar>{avatar}</Avatar>

      <div className={styles.tweetInner}>
        <Formik
          initialValues={
            {
              comment: ''
            }
          }
          onSubmit={(values, actions) => handleSend(values, actions)}
          validateOnBlur
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
            <>
              <FormControl fullWidth noValidate autoComplete="off">
                <TextField
                  fullWidth
                  type='text'
                  name='comment'
                  value={values.comment}
                  onChange={handleChange}
                  placeholder="New comment"
                  onBlur={handleBlur}
                  helperText={!dirty && touched.comment && errors.comment}
                  error={touched.comment && errors.comment ? true : false}
                  multiline
                />
              </FormControl>
              <div className={styles.sendTweet}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                >
                  comment
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NewCommentForm;
