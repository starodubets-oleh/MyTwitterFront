import {
  GET_TWEET,
  GET_TWEETS_LIST,
  IS_LOADING_TWEET,
  IS_LOADING_TWEETS,
  CLEAR_TWEETS_LIST
} from '../actions/tweetsAction';

const tweetsState = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_TWEETS_LIST: {
      return {
        ...state,
        tweets: [...state.tweets ,...payload.data],
        paginationTweets: payload.pagination
      };
    }
    case CLEAR_TWEETS_LIST : {
      return {
        ...state,
        tweets: [],
        paginationTweets: {}
      }
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
