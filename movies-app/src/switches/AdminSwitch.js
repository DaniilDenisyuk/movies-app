import { Route, Redirect, Switch } from "react-router-dom";
import { UserInfo, Profiles, Statistic, Users } from "../pages";

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
