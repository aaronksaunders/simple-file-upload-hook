import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import firebase from "firebase";
import { any } from "prop-types";

import Login from "../pages/Login";
//import useAuth from '../hooks/useFirebaseAuth'

type Props = {
  component:
    | (ReturnType<typeof any> & React.ComponentType<RouteComponentProps<any>>)
    | React.ComponentType<any>;
  path?: string | string[];
};

/**
 * 
 * @param param0 
 */
const PrivateRoute: React.FC<Props> = ({ component: Component, ...props }) => {
let authUser = firebase.auth().currentUser;

  // if i have the login path, handle it differently...
  if (props.path === "/login") {
    return authUser ? <Redirect to="/home" /> : <Route component={Login} />;
  }

  return (
    <Route
      {...props}
      render={innerProps =>
        authUser ? <Component {...innerProps} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
