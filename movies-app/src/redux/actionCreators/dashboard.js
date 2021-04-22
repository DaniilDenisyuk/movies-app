import dashboardAT from "../actionTypes/dashboard";
import { messagesActions } from "./messages";

const fetchDashboardInfo = () => (dispatch) => {
  const request = (user) => {
    return { type: dashboardAT.DASHBOARD_LOADING, user };
  };
  const success = (info) => {
    return { type: dashboardAT.ADD_INFO, info };
  };
  const failure = () => {
    return { type: dashboardAT.LOADING_FAILED };
  };

  return;
};

export const dashboardActions = {};
