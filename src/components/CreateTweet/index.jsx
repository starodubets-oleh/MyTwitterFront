import React from 'react';

import TextAreaTweet from './TextAreaTweet';

import styles from './styles.module.scss';

const CreateTweet = () => {
  return (
    <div className={styles.tweet}>
      <TextAreaTweet />
    </div>
  );
}

export default CreateTweet;
