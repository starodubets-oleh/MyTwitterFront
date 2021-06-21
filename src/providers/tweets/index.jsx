import { useState, useCallback, createContext, useMemo, useContext } from 'react';
import axios from 'axios';

const defaultValue = {
  tweets: [],
  areLoading: false,
  isUpdating: false,
}

export const TweetsContext = createContext(defaultValue);

const TweetsProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const requestTweets = useCallback(
    async () => {
      try {
        setLoading(true);

        const data = await axios.get('/posts');
        setTweets(data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createTweet = useCallback(
    async (tweet) => {
      try {
        setIsUpdating(true);

        await axios.post('/posts', { content: tweet });

        requestTweets();
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [requestTweets],
  );

  const updateTweet = useCallback(
    async (tweet, id) => {
      try {
        setIsUpdating(true);
        console.log(tweet);
        await axios.patch(`/posts/${id}`, { updatedPost: tweet });

        requestTweets();
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [requestTweets],
  );

  const removeTweet = useCallback(
    async (id) => {
      try {
        setIsUpdating(true);

        await axios.delete(`/posts/${id}`);

        requestTweets();
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [requestTweets],
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
