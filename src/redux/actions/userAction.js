import axios from 'axios';

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
    console.log(error);
  }
}


export const userRegistration = (values) => async (dispatch) => {
  try {
    await axios.post(`/auth/sign-up`, values);
    dispatch({
      type: USER_REGISTRATION
    });
  } catch (error) {
    console.log(error);
  }
};
