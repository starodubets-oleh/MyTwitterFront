import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../../providers/auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isLogin } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        isLogin ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute