import React, {useEffect} from 'react';

import TweetItem from './TweetItem'
import Loading from '../Loading';
import { useTweets } from '../../providers/tweets';

const TweetsList = () => {
  const { tweets, areLoading, requestTweets } = useTweets();

  useEffect(
    () => {
      requestTweets();
    }, 
    [requestTweets],
  );


  if (tweets.length === 0) {
    return <p>Your tweets list is empty</p>
  }

  return (
    <>
      {
        areLoading ? (<Loading/>):(tweets.map((item, index) => {
          return(
            <TweetItem
              key={item.id}
              post={item}
              idx={index}
            />
          )
        })
        )
      }
    </>
  );
};

export default TweetsList;
