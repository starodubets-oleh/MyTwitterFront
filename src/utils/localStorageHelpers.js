const USER_KEY = 'user';

export const setLocalStorageUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const getLocalStorageUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export const getLocalStorageUserId = () => getLocalStorageUser()?.id || null;

export const getLocalStorageUserName = () => getLocalStorageUser()?.userName || null;

export const getLocalStorageUserToken = () => getLocalStorageUser()?.token || null;

export const removeLocalStorageUser = () => localStorage.removeItem(USER_KEY);