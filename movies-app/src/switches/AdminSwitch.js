import { Route, Redirect, Switch } from "react-router-dom";
import Profiles from "../pages/Profiles";
import { UserInfo } from "../pages/UserInfo";
import Statistic from "../pages/Statistic";
import Users from "../pages/Users";

const AdminSwitch = (props) => {
  return (
    <Switch>
      <Route exact path="/users" children={<Users />} />
      <Route exact path="/users/:id" children={<UserInfo />} />
      <Route exact path="/users/:id/profiles" children={<Profiles />} />
      <Route exact path="/statistic" children={<Statistic />} />
    </Switch>
  );
};

export default AdminSwitch;
