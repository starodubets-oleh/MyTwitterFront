import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tweetsState from './reducers/tweetsReducer';

const middleware = [ thunk ];

const allReducers = combineReducers({
  tweetsState
});

const initialState = {
  tweetsState: {
    tweets: [],
    loadingPosts: false,
  }
};

const store = createStore(
  allReducers,
  initialState,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
