import {
  GET_TWEET,
  GET_TWEETS_LIST,
  IS_LOADING_TWEET,
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
        loadingTweets: payload
      };
    }
    case GET_TWEET: {
      return {
        ...state,
        tweet: payload
      };
    }
    case IS_LOADING_TWEET: {
      return {
        ...state,
        loadingTweet: payload
      };
    }
    default:
      return state;
  }
};

export default tweetsState;
