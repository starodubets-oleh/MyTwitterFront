import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactPaginate from 'react-paginate';

import { getUsersList } from '../../redux/actions/usersAction';
import { getUsersData, getLoadingUsers, getPagination } from '../../redux/selectors/usersSelector';

import UserItem from './UserItem'

import styles from './styles.module.scss'
import './style.css'

const UsersList = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch]);
  const isLoading = useSelector(getLoadingUsers);
  const usersList = useSelector(getUsersData);
  const pagination = useSelector(getPagination);

  const handlePageClick = (page) => {
    dispatch(getUsersList(page.selected +1))
  }

  return (
    <>
      <h1>Users</h1>
      {
        !isLoading && usersList.map(item => (
          <UserItem
            key={item.id}
            user={item}
          />
        ))
      }
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(pagination.rowCount / pagination.pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        activeClassName={styles.active}
      />
    </>
  );
}

export default UsersList;
