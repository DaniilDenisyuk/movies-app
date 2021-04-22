import { Route, Redirect } from "react-router-dom";
import Loading from "../Loading";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  roles,
  user,
  isLoggedIn,
  isLoggingIn,
  ...rest
}) => {
  if (isLoggingIn) {
    return <Loading message="Вход" />;
  }
  if (isLoggedIn) {
    if (roles && roles.indexOf(user.role) === -1) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

const mapState = (state) => {
  const { isLoggingIn, isLoggedIn, user } = state.auth;
  return { isLoggingIn, isLoggedIn, user };
};

export default connect(mapState)(PrivateRoute);
