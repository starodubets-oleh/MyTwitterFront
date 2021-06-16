import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import SendTweet from './SendTweet';

const TextAreaTweet = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    event.preventDefault()
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue('')
  }

  return (
    <React.Fragment>
      <Avatar className='avatar' >OS</Avatar>
      <div className="tweet__inner">
        <FormControl fullWidth noValidate autoComplete="off">
          <div>
            <TextField
              fullWidth
              id="standard-textarea"
              value={value}
              onChange={handleChange}
              placeholder="What's happening?"
              multiline
            />
          </div>
        </FormControl>
      <SendTweet
        tweet={value}
        clear={clearValue}
      />
      </div>
    </React.Fragment>
  );
}

export default TextAreaTweet;
