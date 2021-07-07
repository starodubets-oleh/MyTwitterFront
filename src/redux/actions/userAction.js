import axios from 'axios';
import { toast } from "react-toastify";

import { setLocalStorageUser } from '../../utils/localStorageHelpers';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTRATION = 'USER_REGISTRATION';

export const userLogin = (values) => async (dispatch) => {
  try {
    const result = await axios.post(`/auth/login`, values);
    const { data } = await result.data;
    setLocalStorageUser(data);

    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.dir(error);
  }
};

export const userRegistration = (values) => async (dispatch) => {
  try {
    const result = await axios.post(`/auth/sign-up`, values);
    dispatch({
      type: USER_REGISTRATION
    });
    toast.success(result.data?.message || 'User created')
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.dir(error);
  }
};
