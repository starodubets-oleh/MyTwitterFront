import React, { useEffect } from 'react';

import TweetItem from './TweetItem'
import Loading from '../Loading';
import { useTweets } from '../../providers/tweets';

const TweetsList = () => {
  const { tweets, loading, requestTweets } = useTweets();

  useEffect(
    () => {
      requestTweets();
    },
    [requestTweets],
  );


  if (tweets.length === 0) {
    return <p>Your tweets list is empty</p>
  }

  if (loading) {
    return <Loading />
  }

  return (
    {
      tweets.map((item, index) => {
        return (
          <TweetItem
            key={item.id}
            tweet={item}
            idx={index}
          />
        )
      })
    }
  );
};

export default TweetsList;
