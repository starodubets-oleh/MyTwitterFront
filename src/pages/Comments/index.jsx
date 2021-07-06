import React from 'react';

import CommentsList from '../../components/CommentsList';
import LogOut from '../../components/LogOut';

import styles from './styles.module.scss'


const Comments = () => {
  return (
    <div className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <a href='/'>Comments</a>
        <LogOut/>
      </div>
      <div className={styles.commentsList}>
    <CommentsList/>
      </div>
    </div>
  </div>
  );
}

export default Comments;
