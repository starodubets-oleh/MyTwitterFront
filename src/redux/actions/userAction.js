import axios from 'axios'
import { toast } from "react-toastify";

import { setLocalStorageUser } from '../../utils/localStorageHelpers';

export const USER_UPLOAD_IMAGE = 'USER_UPLOAD_IMAGE';
export const USER_EDIT_NAME = 'USER_EDIT_NAME';
export const USER_DATA = 'USER_DATA';


export const userData = async (dispatch) => {
  try {
    const user = await axios.get(`/user`);
    const {data} = user.data
    setLocalStorageUser(data);
    
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  }
};

export const userUploadImage = (value) => async (dispatch) => {
  try {
    await axios.patch(`/users/avatar`, value);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(userData)
  }
};
export const userEditName = (value) => async (dispatch) => {
  try {
    await axios.patch(`/users`, value);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(userData)
  }
};

