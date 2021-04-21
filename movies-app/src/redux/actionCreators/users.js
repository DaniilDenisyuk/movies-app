import usersAT from "../actionTypes/users";
import { usersService } from "../../services";
import { addError, addInfo } from "./messages";

export const login = (username, password) => (dispatch) => {
  const request = (user) => {
    return { type: usersAT.LOGIN_REQUEST, user };
  };
  const success = (user) => {
    return { type: usersAT.LOGIN_REQUEST, user };
  };
  const failure = () => {
    return { type: usersAT.LOGIN_FAILURE };
  };

  dispatch(request(username));

  return usersService.login(username, password).then(
    (user) => {
      dispatch(success(user));
    },
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

export const logout = () => (dispatch) => {
  return usersService.logout().then(
    () => {
      dispatch({ type: usersAT.LOGOUT });
      dispatch(addInfo("Logged out"));
    },
    (error) => {
      dispatch(addError(error));
    }
  );
};

export const getAllUsers = () => {
  const request = () => {
    return { type: usersAT.GET_ALL_USERS_REQUEST };
  };
  const success = (users) => {
    return { type: usersAT.GET_ALL_USERS_SUCCESS, users };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_USERS_FAILURE };
  };

  return (dispatch) => {
    dispatch(request());
    usersService.getAllUsers().then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

export const getAllProfiles = (userId) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersService.getAllProfiles(userId).then(
      (profiles) => {
        dispatch(success(profiles));
      },
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};
