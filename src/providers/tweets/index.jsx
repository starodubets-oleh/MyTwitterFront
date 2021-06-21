import { useState, useCallback, createContext, useMemo, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../auth'

const defaultValue = {
  tweets: [],
  areLoading: false,
  isUpdating: false,
}

export const TweetsContext = createContext(defaultValue);

const TweetsProvider = ({ children }) => {

  const { handleChangeIsLogin } = useContext(AuthContext);

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const requestTweets = useCallback(
    () => {
      setLoading(true);
      axios.get('/posts')
        .then((res) => {
          setTweets(res.data || []);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            handleChangeIsLogin()
          }
        })
        .finally(() => {
          setLoading(false);
        })
    },
    [handleChangeIsLogin],
  );

  const createTweet = useCallback(
    (tweet) => {
      setIsUpdating(false);
      axios.post('/posts', { content: tweet })
        .then(() => {
          requestTweets();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            handleChangeIsLogin()
          }
        })
        .finally(() => {
          setIsUpdating(false);
        })
    },
    [requestTweets, handleChangeIsLogin],
  );

  const updateTweet = useCallback(
    (tweet, id) => {
      setIsUpdating(false);
      axios.patch(`/posts/${id}`, { updatedPost: tweet })
        .then(() => {
          requestTweets();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            handleChangeIsLogin()
          }
        })
        .finally(() => {
          setIsUpdating(false);
        })
    },
    [requestTweets, handleChangeIsLogin],
  );

  const removeTweet = useCallback(
    (id) => {
      setIsUpdating(false);
      axios.delete(`/posts/${id}`)
        .then(() => {
          requestTweets();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            handleChangeIsLogin()
          }
        })
        .finally(() => {
          setIsUpdating(false);
        })
    },
    [requestTweets, handleChangeIsLogin],
  );

  const value = useMemo(
    () => ({
      tweets,
      loading,
      isUpdating,
      requestTweets,
      createTweet,
      removeTweet,
      updateTweet
    }),
    [tweets, loading, requestTweets, createTweet, updateTweet, removeTweet, isUpdating],
  );

  return (
    <TweetsContext.Provider value={value}>
      {children}
    </TweetsContext.Provider>
  )
}

export const useTweets = () => useContext(TweetsContext);

export default TweetsProvider;
