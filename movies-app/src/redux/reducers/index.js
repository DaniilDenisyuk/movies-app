import { combineReducers } from "redux";
import films from "./films";
import users from "./users";
import messages from "./messages";
import auth from "./auth";
import profiles from "./profiles";

export default combineReducers({
  films,
  users,
  messages,
  auth,
  profiles,
});
