import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import Loading from "./../components/Loading";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <Loading />;
  }
  if (user) {
    if (roles && roles.indexOf(user.role) === -1) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};
