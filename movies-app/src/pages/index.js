import Films from "./Films";
import Home from "./Home";
import Profiles from "./Profiles";
import Statistic from "./Statistic";
import Users from "./Users";
import Header from "../components/Header";
import { AuthFormModal, RegistrFormModal } from "../components/modals";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
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
    <div className="app">
      <Header />
      <div className="body">
        <Switch location={background || location}>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" children={<Home />} />
          <Route path="/films" children={<Films />} />
          <Route path="/profiles" children={<Profiles />} />
          <Route path="/users" children={<Users />} />
          <Route path="/statistic" children={<Statistic />} />
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
      </div>
      <footer className="footer">Copyright belongs to Daniil Denysiuk©</footer>
    </div>
  );
};

export default PagesSwitch;
