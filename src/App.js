import React from 'react';
import axios from 'axios';
import Main from './pages/Main'


axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
      <Main/>
  );
}

export default App;
