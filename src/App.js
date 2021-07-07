import React from 'react';
import axios from 'axios';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';

import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Comments from './pages/Comments';
import Login from './components/Login';
import SignUp from './components/SignUp';
import User from './pages/User';


import { getLocalStorageUserToken, removeLocalStorageUser } from './utils/localStorageHelpers';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = `Bearer ${getLocalStorageUserToken()}`;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeLocalStorageUser();
      return Promise.reject(error)
      // window.location.reload();
    } else {
      return Promise.reject(error)
    }
  }
)

const NotFound = () => <h1>404</h1>

const App = () => {
  return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/posts/:postId/comments' component={Comments} />
          <Route exact path='/user' component={User} />
          <Route component={NotFound} />
        </Switch>
      </Router>
  );
};

export default App;
