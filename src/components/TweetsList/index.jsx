import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearTweetsList, requestTweetsList } from '../../redux/actions/tweetsAction';
import { tweetsList, getLoadingTweets, getPaginationTweets } from '../../redux/selectors/tweetsSelector'
import { getLocalStorageUserId } from '../../utils/localStorageHelpers';
import useScrollLoader from '../../hooks/useScrollLoader';
import usePrevious from '../../hooks/usePrevious';

import TweetItem from './TweetItem'
import Loading from '../Loading';

const TweetsList = () => {

  const dispatch = useDispatch();
  const tweets = useSelector(tweetsList);
  const pagination = useSelector(getPaginationTweets)
  const isLoading = useSelector(getLoadingTweets);
  const allTweetsAreLoaded = pagination?.cursors?.after;
  
  const [nextPagination, setNextPagination] = useState(0)
  const previousPagination = usePrevious(nextPagination);

  useEffect(() => {
    dispatch(requestTweetsList(getLocalStorageUserId()));
    return () => {
      dispatch(clearTweetsList)
    }
  }, [dispatch]);

  const nextPage = useCallback(
    (pagination) => {
      dispatch(
        requestTweetsList(getLocalStorageUserId(), pagination)
      )
    },
    [dispatch],
  );

  useEffect(
    () => {
      if (nextPagination !== previousPagination && allTweetsAreLoaded) {
        nextPage(nextPagination);
      }
    },
    [nextPagination, previousPagination, nextPage, allTweetsAreLoaded],
  )

  const handleChangePagination = () => {
    allTweetsAreLoaded && setNextPagination(pagination?.cursors?.after[0])
  }

  useScrollLoader(handleChangePagination);

  if (tweets.length === 0) {
    return <p>Your tweets list is empty</p>
  }

  return (
    <>
      {tweets.map((item) => (
        <TweetItem
          key={item.id}
          tweet={item}
        />
      ))
      }
      {
        isLoading && <Loading />
      }
    </>
  );
};

export default TweetsList;