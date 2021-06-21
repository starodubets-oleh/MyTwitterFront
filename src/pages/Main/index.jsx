import React from 'react';

import TweetsProvider from '../../providers/tweets'

import NewTweetForm from '../../components/NewTweetForm';
import TweetsList from '../../components/TweetsList';
import LogOut from '../../components/LogOut';

import styles from './styles.module.scss';

const Main = () => {
  return (
    <TweetsProvider>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <a href='/'>Home</a>
            <LogOut/>
          </div>
          <NewTweetForm />
          <div className={styles.tweetsList}>
            <TweetsList />
          </div>
        </div>
      </div>
    </TweetsProvider>
  );
}

export default Main;
