import {
  IS_LOADING_USERS,
  USERS_DATA
} from '../actions/usersAction';

const usersState = (state = {}, { type, payload }) => {
  switch (type) {
    case USERS_DATA: {
      return {
        ...state,
        users: payload.data,
        pagination: payload.pagination
      };
    }
    case IS_LOADING_USERS : {
      return{
        ...state,
        loadingUsers: payload
      }

    }
    default:
      return state;
  }
};

export default usersState;
