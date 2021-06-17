import React from 'react';

import CreateTweet from '../../components/CreateTweet';
import TweetsList from '../../components/TweetsList';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <a href='/'>Home</a>
        </div>
        <CreateTweet />
        <div className={styles.tweetsList}>
          <TweetsList />
        </div>
      </div>
    </div>
  );
}

export default Main;
