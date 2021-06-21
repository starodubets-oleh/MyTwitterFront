import React, { useEffect, useState, createContext } from "react";
import { useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true);
    }
  }, []);

  const handleChangeIsLogin = useCallback(
    () => {
      setIsLogin(false);
      localStorage.removeItem('token');
      window.location.reload();
    },
    []
  );

  return (
    <AuthContext.Provider
      value={
        {
          isLogin,
          handleChangeIsLogin
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};