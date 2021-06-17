import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';

import styles from './styles.module.scss';
import { useTweets } from '../../../providers/tweets';

const SendTweet = ({ tweet, clear }) => {
  const { createTweet } = useTweets();

  const handleSend = useCallback(
    async () => {
      await createTweet(tweet);
      clear();
    },
    [createTweet, tweet, clear],
  );

  return (
    <div className={styles.sendTweet}>
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
