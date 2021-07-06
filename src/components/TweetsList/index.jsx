import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestTweetsList } from '../../redux/actions/tweetsAction';
import { getReversedTweetsList, getLoadingTweets} from '../../redux/selectors/tweetsSelector'

import TweetItem from './TweetItem'
import Loading from '../Loading';

const TweetsList = () => {

  const dispatch = useDispatch();
  const tweets = useSelector(getReversedTweetsList);
  const isLoading = useSelector(getLoadingTweets);

  useEffect(() => {
    dispatch(requestTweetsList);
  }, [dispatch]);

  if (tweets.length === 0) {
    return <p>Your tweets list is empty</p>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    tweets.map((item) => (
      <TweetItem
        key={item.id}
        tweet={item}
      />
    ))
  );
};

export default TweetsList;
