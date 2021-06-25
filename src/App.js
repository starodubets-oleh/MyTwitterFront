import React from 'react';
import axios from 'axios';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';

import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { getLocalStorageUserToken, removeLocalStorageUser } from './utils/localStorageHelpers';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = `Bearer ${getLocalStorageUserToken()}`;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeLocalStorageUser();
      
      window.location.reload();
    } else {
      Promise.reject(error)
    }
  }
)

const App = () => {
  return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
  );
};

export default App;
