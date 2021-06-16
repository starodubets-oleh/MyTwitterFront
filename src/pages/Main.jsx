import React from 'react';

import CreateTweet from '../components/CreateTweet'
import TweetsList from '../components/TweetsList'

import './style.css'

const Main = () => {
  return (
    <div className='main'>
      <div className="wrapper">
        <div className="header">
          <a href='/'>Home</a>
        </div>
        <CreateTweet/>
        <div className="tweets-list">
          <TweetsList/>
        </div>
      </div>
    </div>
  );
}

export default Main;
