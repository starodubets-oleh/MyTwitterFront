import {
  GET_TWEETS_LIST,
  IS_LOADING_TWEETS
} from '../actions/tweetsAction';

const tweetsState = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_TWEETS_LIST: {
      return {
        ...state,
        tweets: payload
      };
    }
    case IS_LOADING_TWEETS: {
      return {
        ...state,
        loadingPosts: payload
      };
    }
    default:
      return state;
  }
};

export default tweetsState;
