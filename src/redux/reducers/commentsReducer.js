import {
  GET_COMMENTS_LIST,
  IS_LOADING_COMMENTS
} from '../actions/commentsAction';

const tweetsState = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS_LIST: {
      return {
        ...state,
        comments: payload
      };
    }
    case IS_LOADING_COMMENTS: {
      return {
        ...state,
        loadingComments: payload
      };
    }
    default:
      return state;
  }
};

export default tweetsState;
