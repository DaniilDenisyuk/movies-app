import { Films, Home, Profiles, UserInfo } from "../pages";
import AdminSwitch from "./AdminSwitch";
import { PrivateRoute } from "./PrivateRoute";
import { AuthFormModal, RegistrFormModal } from "../components/modals";
import { ROLES } from "../shared/roles";

import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const PagesSwitch = () => {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const back = (e) => {
    e.stopPropagation();
    history.push(background);
  };
  const handleRegistr = (data) => {
    console.log("registr", data);
    back();
  };
  const handleAuth = (data) => {
    console.log("auth", data);
    back();
  };
  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" children={<Home />} />
        <Route path="/films" children={<Films />} />
        <PrivateRoute path="/user" component={UserInfo} />
        <PrivateRoute path="/profiles" component={Profiles} />
        <PrivateRoute
          path="/admin"
          roles={[ROLES.ADMIN]}
          component={AdminSwitch}
        />
        <Redirect
          from="/login"
          to={{
            pathname: "/login",
            state: { background: { pathname: "/home" } },
          }}
        />
        <Redirect
          from="/registr"
          to={{
            pathname: "/registr",
            state: { background: { pathname: "/home" } },
          }}
        />
        <Redirect to="/home" />
      </Switch>
      {background && (
        <>
          <Route
            path="/login"
            children={
              <AuthFormModal handleSubmit={handleAuth} handleClose={back} />
            }
          />
          <Route
            path="/registr"
            children={
              <RegistrFormModal
                handleSubmit={handleRegistr}
                handleClose={back}
              />
            }
          />
        </>
      )}
    </>
  );
};

export default PagesSwitch;
