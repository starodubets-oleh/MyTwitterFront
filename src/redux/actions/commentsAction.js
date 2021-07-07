import axios from 'axios';
import { toast } from "react-toastify";

export const GET_COMMENTS_LIST = 'GET_COMMENTS_LIST';
export const IS_LOADING_COMMENTS = 'IS_LOADING_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const isLoadingComment = (value) => (dispatch) => {
  dispatch({
    type: IS_LOADING_COMMENTS,
    payload: value
  });
};

export const requestCommentsList = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING_COMMENTS,
      payload: true
    });
    const res = await axios.get(`/posts/${postId}/comments`);
    const { data } = res.data;
    dispatch({
      type: GET_COMMENTS_LIST,
      payload: data
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch({
      type: IS_LOADING_COMMENTS,
      payload: false
    });
  }
};

export const createComment = (content, postId) => async (dispatch) => {
  try {
    await axios.post(`/posts/${postId}/comments`, { content });
    dispatch({
      type: CREATE_COMMENT
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(requestCommentsList(postId));
  }
};

export const updateComment = (updatedComment, commentId, postId) => async (dispatch) => {
  try {
    await axios.patch(`/comments/${commentId}`, { updatedComment });
    dispatch({
      type: UPDATE_COMMENT
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(requestCommentsList(postId));
  }
};

export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    await axios.delete(`/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    console.log(error);
  } finally {
    dispatch(requestCommentsList(postId));
  }
};
