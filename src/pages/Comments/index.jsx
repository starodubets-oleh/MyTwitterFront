import React from 'react';
import { Link } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommentsList from '../../components/CommentsList';
import LogOut from '../../components/LogOut';

import styles from './styles.module.scss'


const Comments = () => {
  return (
    <>
    <div className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
      <Link to='/'>Home</Link>
        <LogOut/>
      </div>
      <div className={styles.commentsList}>
    <CommentsList/>
      </div>
    </div>
  </div>
  <ToastContainer autoClose={5000} />
  </>
  );
}

export default Comments;
