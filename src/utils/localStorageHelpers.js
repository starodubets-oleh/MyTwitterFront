const USER_KEY = 'user';
const USER_TOKEN_KEY = 'token';

export const setLocalStorageUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const setLocalStorageToken = (token) => localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(token));

export const getLocalStorageUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export const getLocalStorageToken = () => {
  const token = localStorage.getItem(USER_TOKEN_KEY);

  if (token) {
    return JSON.parse(token);
  }

  return null;
};

export const getLocalStorageUserId = () => getLocalStorageUser()?.id || null;

export const getLocalStorageUserName = () => getLocalStorageUser()?.userName || null;

export const getLocalStorageUserEmail = () => getLocalStorageUser()?.email || null;

export const getLocalStorageUserToken = () => getLocalStorageToken() || null;

export const getLocalStorageUserAvatar = () => getLocalStorageUser()?.user_img || null;

export const removeLocalStorageUser = () => localStorage.removeItem(USER_KEY);
export const removeLocalStorageToken = () => localStorage.removeItem(USER_TOKEN_KEY);