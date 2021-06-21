import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { useTweets } from '../../../providers/tweets';
import { Formik } from 'formik';
import * as yup from 'yup';

import styles from './styles.module.scss';

const TextAreaTweet = () => {

  const { createTweet } = useTweets();

  const validationSchema = yup.object().shape({
    tweet: yup.string().typeError('Only as a string').min(3, 'short tweet').max(50, 'long tweet').required()
  })

  const handleSend = useCallback(
    async ({tweet}, {resetForm}) => {
      await createTweet(tweet);
      resetForm({})
    },
    [createTweet],
  );

  return (
    <>
      <Avatar>OS</Avatar>

      <div className={styles.tweetInner}>
        <Formik
          initialValues={
            {
              tweet: ''
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
                  name='tweet'
                  value={values.tweet}
                  onChange={handleChange}
                  placeholder="What's happening?"
                  onBlur={handleBlur}
                  helperText={!dirty && touched.tweet && errors.tweet}
                  error={!dirty && touched.tweet && errors.tweet}
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
                  tweet
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  );
}

export default TextAreaTweet;
