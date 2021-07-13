import axios from 'axios';
import { toast } from "react-toastify";
import { getLocalStorageUserId } from '../../utils/localStorageHelpers';

export const GET_TWEETS_LIST = 'GET_TWEETS_LIST';
export const IS_LOADING_TWEETS = 'IS_LOADING_TWEETS';
export const GET_TWEET = 'GET_TWEET';
export const IS_LOADING_TWEET = 'IS_LOADING_TWEET';
export const CREATE_TWEET = 'CREATE_TWEET';
export const UPDATE_TWEET = 'UPDATE_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';
export const CLEAR_TWEETS_LIST = 'CLEAR_TWEETS_LIST';

export const isLoadingTweets= (value) => (dispatch) => {
  dispatch({
    type: IS_LOADING_TWEETS,
    payload: value
  });
};
export const isLoadingTweet = (value) => (dispatch) => {
  dispatch({
    type: IS_LOADING_TWEET,
    payload: value
  });
};

export const requestTweetsList = (userId, point, size = 10) => async (dispatch) => {
  const query = point ? `?point=${point}&size=${size}` : `?size=${size}`
  try {
    dispatch(isLoadingTweets(true));
    const res = await axios.get(`/users/${userId}/posts${query}`);
    const {data, pagination} = res.data;
    dispatch({
      type: GET_TWEETS_LIST,
      payload: {data: data || [], pagination}
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(isLoadingTweets(false));
  }
};

export const clearTweetsList = (dispatch) => {
  dispatch(
    {
      type: CLEAR_TWEETS_LIST
    }
  )
}

export const requestTweet = (userId, postId) => async (dispatch) => {
  try {
    dispatch(isLoadingTweet(true));
    const res = await axios.get(`users/${userId}/posts/${postId}`);
    const { data } = res.data;
    dispatch({
      type: GET_TWEET,
      payload: data[0] || []
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(isLoadingTweet(false));
  }
};

export const clearTweet = (dispatch) => {
  dispatch({
    type: GET_TWEET,
    payload: []
  });
}

export const createTweet = (content) => async (dispatch) => {
  try {
    await axios.post('/posts', { content });
    dispatch({
      type: CREATE_TWEET
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(requestTweetsList(getLocalStorageUserId()))
  }
};

export const updateTweet = (updatedPost, postId) => async (dispatch) => {
  try {
    await axios.patch(`/posts/${postId}`, { updatedPost });
    dispatch({
      type: UPDATE_TWEET
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(requestTweetsList(getLocalStorageUserId()))
  }
};

export const deleteTweet = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch({
      type: DELETE_TWEET
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(requestTweetsList(getLocalStorageUserId()))
  }
};