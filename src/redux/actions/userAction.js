import axios from 'axios'

import { setLocalStorageUser, setLocalStorageToken } from '../../utils/localStorageHelpers';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_UPLOAD_IMAGE = 'USER_UPLOAD_IMAGE';
export const USER_EDIT_NAME = 'USER_EDIT_NAME';
export const USER_DATA = 'USER_DATA';

export const userLogin = (values) => async (dispatch) => {
  try {
    const result = await axios.post(`/auth/login`, values);
    const { data: {token, ...otherData} } = await result.data;
    setLocalStorageUser(otherData);
    setLocalStorageToken(token);

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
export const userData = async (dispatch) => {
  try {
    const user = await axios.get(`/users`);
    const {data} = user.data
    dispatch({
      type: USER_DATA
    });
    setLocalStorageUser(data);
    
  } catch (error) {
    console.log(error);
  }  finally {
    dispatch(userData)
  }
};

export const userUploadImage = (value) => async (dispatch) => {
  try {
    await axios.patch(`/users/avatar`, value);
    dispatch({
      type: USER_UPLOAD_IMAGE
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(userData)
  }
};
export const userEditName = (value) => async (dispatch) => {
  try {
    await axios.patch(`/users`, value);
    dispatch({
      type: USER_EDIT_NAME
    });
  } catch (error) {
    console.log(error);
  }
};