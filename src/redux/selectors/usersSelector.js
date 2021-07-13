export const getUsersData = state => state.usersState.users || [];
export const getPagination = state => state.usersState.pagination;
export const getLoadingUsers = state => state.usersState.loadingUsers;