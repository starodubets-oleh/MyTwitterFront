import React from 'react';
import axios from 'axios';
import Main from './pages/Main';
import TweetsProvider from './providers/tweets';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => (
  <TweetsProvider>
    <Main/>
  </TweetsProvider>
);

export default App;
