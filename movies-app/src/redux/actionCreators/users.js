import usersAT from "../actionTypes/users";
import { usersService } from "../../services";
import { addError, addInfo, addSuccess } from "./messages";

export const login = (username, password) => (dispatch) => {
  const request = (user) => {
    return { type: usersAT.LOGIN_REQUEST, user };
  };
  const success = (user) => {
    return { type: usersAT.LOGIN_SUCCESS, user };
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

export const register = (username, password) => (dispatch) => {
  const request = () => {
    return { type: usersAT.REGISTER_REQUEST };
  };
  const success = () => {
    return { type: usersAT.REGISTER_SUCCESS };
  };
  const failure = () => {
    return { type: usersAT.REGISTER_FAILURE };
  };

  dispatch(request());

  return usersService.register(username, password).then(
    () => {
      dispatch(success());
      dispatch(addSuccess("Succesfully registered"));
    },
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

export const logout = (token) => (dispatch) => {
  return usersService.logout(token).then(
    () => {
      dispatch({ type: usersAT.LOGOUT });
      dispatch(addInfo("Logged out"));
    },
    (error) => {
      dispatch(addError(error));
    }
  );
};

export const refreshToken = (user) => (dispatch) => {
  const request = (user) => {
    return { type: usersAT.LOGIN_REQUEST, user };
  };
  const success = (user) => {
    return { type: usersAT.LOGIN_SUCCESS, user };
  };
  const failure = () => {
    return { type: usersAT.LOGIN_FAILURE };
  };
  dispatch(request(user));
  return usersService.refreshToken().then(
    (freshUser) => {
      dispatch(success(freshUser));
      dispatch(addInfo("Token refreshed"));
    },
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

export const getAllUsers = (token) => {
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
    usersService.getAllUsers(token).then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

export const getAllProfiles = (userId, token) => {
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
    usersService.getAllProfiles(userId, token).then(
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
