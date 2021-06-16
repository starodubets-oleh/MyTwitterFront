import React, {useEffect, useState} from 'react';
import axios from 'axios';

import TweetItem from './TweetItem'
import Loading from '../Loading/Loading';

import './index.css'

const TweetsList = () => {

  const [tweets, setTweets] = useState([]);
  const [tweetsEmpty, setTweetsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        setIsLoading(true)
        if (res.data.length !== 0) {
          setTweets(res.data)
        } else {
          setTweetsEmpty(true)
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, []);

  if (tweetsEmpty) {
    return <p>Your tweets list is empty</p>
  }


  return (
    <React.Fragment>
      {
        isLoading ? (<Loading/>):(tweets.map((item, index) => {
          return(
            <TweetItem
              key={item.id}
              post={item}
              idx={index}
            />
          )
        })
        )
      }
    </React.Fragment>
  );
};

export default TweetsList;
