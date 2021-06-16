import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import SendTweet from '../SendTweet';
import { useCallback } from 'react';

import styles from './styles.module.scss';

const TextAreaTweet = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (event) => {
      event.preventDefault()
      setValue(event.target.value);
    },
    [],
  );
  
  const clearValue = useCallback(
    () => {
      setValue('');
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
        <SendTweet
          tweet={value}
          clear={clearValue}
        />
      </div>
    </>
  );
}

export default TextAreaTweet;
