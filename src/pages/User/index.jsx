import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditUser from '../../components/UserCard';
import LogOut from '../../components/LogOut';

import styles from './styles.module.scss'


const User = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <a href='/'>User</a>
            <LogOut />
          </div>
          <div className={styles.commentsList}>
            <EditUser />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
}

export default User;
