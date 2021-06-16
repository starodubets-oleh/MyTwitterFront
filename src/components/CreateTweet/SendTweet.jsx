import React from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';

const SendTweet = ({tweet, clear}) => {

  const handleSend = () => {
    axios.post('/posts', {post: tweet})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(()=>{
      clear()
    });
  };

  return (
    <div className='send-tweet'>
      <Button
        onClick={handleSend} 
        variant="contained"
        color="primary"
        disabled={tweet.length === 0}
      >
        tweet
      </Button>
    </div>
  );
};

export default SendTweet;
