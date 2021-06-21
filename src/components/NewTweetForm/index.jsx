import React from 'react';

import TextAreaTweet from './TextAreaTweet';

import styles from './styles.module.scss';

const NewTweetForm = () => {
  return (
    <div className={styles.tweet}>
      <TextAreaTweet />
    </div>
  );
}

export default NewTweetForm;
