import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tweetsState from './reducers/tweetsReducer';
import commentsState from './reducers/commentsReducer';

const middleware = [ thunk ];

const allReducers = combineReducers({
  tweetsState,
  commentsState
});

const initialState = {
  tweetsState: {
    tweets: [],
    loadingTweets: false,
    tweet: {},
    loadingTweet: false,
  },
  commentsState: {
    comments: [],
    loadingComments: false
  }
};

const store = createStore(
  allReducers,
  initialState,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
