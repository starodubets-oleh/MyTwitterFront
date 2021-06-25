import React from 'react';
import { Button } from '@material-ui/core';
import { useCallback } from 'react';
import { removeLocalStorageUser } from '../../utils/localStorageHelpers';

const LogOut = () => {
  const handleLogOut = useCallback(() => {
    removeLocalStorageUser();
    window.location.reload();
  }, []);

  return (
    <Button onClick={handleLogOut} color='primary'>
      Log Out
    </Button>
  );
};

export default LogOut;
