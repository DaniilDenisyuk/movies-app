import { Route, Redirect, Switch } from "react-router-dom";
import { UserInfo, Profiles, Statistic, Users } from "../pages";

const AdminSwitch = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/users`} children={<Users />} />
      <Route exact path={`${match.url}/users/:id`} children={<UserInfo />} />
      <Route
        exact
        path={`${match.url}/users/:id/profiles`}
        children={<Profiles />}
      />
      <Route exact path={`${match.url}/statistic`} children={<Statistic />} />
    </Switch>
  );
};

export default AdminSwitch;
