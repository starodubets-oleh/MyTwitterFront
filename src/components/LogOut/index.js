import React from 'react';
import {Button} from '@material-ui/core'
import { useCallback } from 'react';

const LogOut = () => {

  const handleLogOut = useCallback(
    () => {
      localStorage.removeItem('token')
      window.location.reload()
    },
    []
  )

  return (
    <Button
    onClick={handleLogOut}
      color='primary'
    >
      Log Out
    </Button>
  );
}

export default LogOut;
