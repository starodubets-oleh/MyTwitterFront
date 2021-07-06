import axios from 'axios';

export const GET_TWEETS_LIST = 'GET_TWEETS_LIST';
export const IS_LOADING_TWEETS = 'IS_LOADING_TWEETS';
export const GET_TWEET = 'GET_TWEET';
export const IS_LOADING_TWEET = 'IS_LOADING_TWEET';
export const CREATE_TWEET = 'CREATE_TWEET';
export const UPDATE_TWEET = 'UPDATE_TWEET';
export const DELETE_TWEET = 'DELETE_TWEET';

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

export const requestTweetsList = async (dispatch) => {
  try {
    dispatch(isLoadingTweets(true));
    const res = await axios.get('/posts');
    const { data } = res.data;
    dispatch({
      type: GET_TWEETS_LIST,
      payload: data
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(isLoadingTweets(false));
  }
};

export const requestTweet = (postId) => async (dispatch) => {
  try {
    dispatch(isLoadingTweet(true));
    const res = await axios.get(`/posts/${postId}`);
    const { data } = res.data;
    dispatch({
      type: GET_TWEET,
      payload: data
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(isLoadingTweet(false));
  }
};

export const createTweet = (content) => async (dispatch) => {
  try {
    await axios.post('/posts', { content });
    dispatch({
      type: CREATE_TWEET
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(requestTweetsList)
  }
};

export const updateTweet = (updatedPost, postId) => async (dispatch) => {
  try {
    await axios.patch(`/posts/${postId}`, { updatedPost });
    dispatch({
      type: UPDATE_TWEET
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(requestTweetsList)
  }
};

export const deleteTweet = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch({
      type: DELETE_TWEET
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(requestTweetsList)
  }
};