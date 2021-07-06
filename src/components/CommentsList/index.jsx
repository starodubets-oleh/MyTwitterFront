import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { requestTweet } from '../../redux/actions/tweetsAction';
import { requestCommentsList } from '../../redux/actions/commentsAction';
import { getReversedCommentsList, getLoadingComments } from '../../redux/selectors/commentsSelector';
import { getTweet, getLoadingTweet } from '../../redux/selectors/tweetsSelector';

import NewCommentForm from './NewCommentForm';
import CommentItem from './CommentItem';
import Loading from '../Loading';
import TweetItem from '../TweetsList/TweetItem';

import styles from './styles.module.scss';

const CommentsList = () => {

  const { postId } = useParams();

  const dispatch = useDispatch();
  
  const commentsList = useSelector(getReversedCommentsList);
  const isLoadingComments = useSelector(getLoadingComments);
  const tweet = useSelector(getTweet);
  const isLoadingTweet = useSelector(getLoadingTweet);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(requestTweet(postId));
    dispatch(requestCommentsList(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    setComments(commentsList);
  }, [commentsList]);

  if ( isLoadingTweet || isLoadingComments) {
    return <Loading />
  }

  return (
    <div>
      <div className={styles.commentContent}>
        {
          tweet.id && <TweetItem
          tweet={tweet}
        />
        }
        <NewCommentForm
          postId={postId}
        />
        <h1>comments list</h1>
        {
          comments.map(item => (
            <CommentItem
              key={item.id}
              data={item}
            />
          ))
        }
      </div>
    </div>
  );
};

export default CommentsList;
