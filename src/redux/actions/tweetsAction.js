import axios from 'axios';

export const GET_TWEETS_LIST = 'GET_TWEETS_LIST';
export const IS_LOADING_TWEETS = 'IS_LOADING_TWEETS';
export const CREATE_TWEET = 'CREATE_TWEET';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_TWEET = 'UPDATE_TWEET';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_TWEET = 'DELETE_TWEET';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const isLoadingPost = (value) => (dispatch) => {
  dispatch({
    type: IS_LOADING_TWEETS,
    payload: value
  });
};

export const requestTweetsList = async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING_TWEETS,
      payload: true
    });
    const res = await axios.get('/posts');
    const { data } = res.data;
    dispatch({
      type: GET_TWEETS_LIST,
      payload: data
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: IS_LOADING_TWEETS,
      payload: false
    });
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

export const createComment = (content, postId) => async (dispatch) => {
  try {
    await axios.post(`/posts/${postId}/comments`, { content });
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

export const updateComment = (updatedComment, commentId) => async (dispatch) => {
  try {
    await axios.patch(`/comments/${commentId}`, { updatedComment });
    dispatch({
      type: UPDATE_COMMENT
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

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await axios.delete(`/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(requestTweetsList)
  }
};
