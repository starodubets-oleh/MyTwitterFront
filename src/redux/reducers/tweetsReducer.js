import {
  GET_TWEET,
  GET_TWEETS_LIST,
  IS_LOADING_TWEET,
  IS_LOADING_TWEETS,
  CLEAR_TWEETS_LIST,
  CREATE_TWEET,
  UPDATE_TWEET,
  DELETE_TWEET
} from '../actions/tweetsAction';

const tweetsState = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_TWEETS_LIST: {
      return {
        ...state,
        tweets: [ ...state.tweets, ...payload.data ],
        paginationTweets: payload.pagination
      };
    }
    case CLEAR_TWEETS_LIST: {
      return {
        ...state,
        tweets: [],
        paginationTweets: {}
      };
    }
    case CREATE_TWEET: {
      return {
        ...state,
        tweets: [payload, ...state.tweets]
      };
    }
    case DELETE_TWEET: {
      return {
        ...state,
        tweets: [...state.tweets].reduce((acc, item) => {
          if (payload !== item.id) {
            acc.push(item)
          }
          return acc
        }, [])
      };
    }
    case UPDATE_TWEET: {
      return {
        ...state,
        tweets: [...state.tweets].reduce((acc, item) => {
          if (payload.id === item.id) {
            acc.push(payload)
          } else {
            acc.push(item)
          }
          return acc
        }, [])
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
