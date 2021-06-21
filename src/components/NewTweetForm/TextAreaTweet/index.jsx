import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { useTweets } from '../../../providers/tweets';

import styles from './styles.module.scss';

const TextAreaTweet = () => {

  const { createTweet } = useTweets();

  const [value, setValue] = useState('');

  const handleSend = useCallback(
    async () => {
      await createTweet(value);
      setValue('');
    },
    [value, createTweet],
  );

  const handleChange = useCallback(
    (event) => {
      event.preventDefault()
      setValue(event.target.value);
    },
    [],
  );

  return (
    <>
      <Avatar>OS</Avatar>

      <div className={styles.tweetInner}>
        <FormControl fullWidth noValidate autoComplete="off">
          <TextField
            fullWidth
            id="standard-textarea"
            value={value}
            onChange={handleChange}
            placeholder="What's happening?"
            multiline
          />
        </FormControl>
        <div className={styles.sendTweet}>
          <Button
            onClick={handleSend}
            variant="contained"
            color="primary"
            disabled={value.length === 0}
          >
            tweet
          </Button>
        </div>
      </div>
    </>
  );
}

export default TextAreaTweet;
