import React from 'react';
import axios from 'axios';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';

import { AuthProvider } from './providers/auth';

import PrivateRoute from './components/PrivateRoute';
import Main from './pages/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
