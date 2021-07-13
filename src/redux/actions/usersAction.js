import axios from 'axios'
import { toast } from "react-toastify";

export const USERS_DATA = 'USERS_DATA';
export const IS_LOADING_USERS = 'IS_LOADING_USERS';

export const isLoadingUsers= (value) => (dispatch) => {
  dispatch({
    type: IS_LOADING_USERS,
    payload: value
  });
};

export const getUsersList = (page = 1, size = 10) => async (dispatch) => {
  try {
    dispatch(isLoadingUsers(true))
    const result = await axios.get(`/users?page=${page}&size=${size}`);
    dispatch({
      type: USERS_DATA,
      payload: result.data
    })
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(isLoadingUsers(false))
  }
} 