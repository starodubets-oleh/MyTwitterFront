import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getLocalStorageUser } from "../../utils/localStorageHelpers";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        getLocalStorageUser() ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute