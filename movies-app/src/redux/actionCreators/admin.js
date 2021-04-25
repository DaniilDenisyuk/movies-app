import adminAT from "../actionTypes/admin";
import { messagesActions } from "./message";
import { usersProfilesService } from "../../services";
const { addError } = messagesActions;

const fetchUsers = (token) => {
  const request = () => {
    return { type: adminAT.GET_ALL_USERS_REQUEST };
  };
  const success = (users) => {
    return { type: adminAT.GET_ALL_USERS_SUCCESS, users };
  };
  const failure = () => {
    return { type: adminAT.GET_ALL_USERS_FAILURE };
  };

  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllUsers(token).then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const fetchUserProfiles = (token, userId) => {
  const request = () => {
    return { type: adminAT.GET_USER_PROFILES_REQUEST };
  };
  const success = (profiles, userId) => {
    return { type: adminAT.GET_USER_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: adminAT.GET_USER_PROFILES_FAILURE };
  };

  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllUsers(token, userId).then(
      (profiles) => dispatch(success(profiles, userId)),
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const fetchDashboard = (token) => (dispatch) => {
  const request = () => {
    return { type: adminAT.GET_DASHBOARD_REQUEST };
  };
  const success = (dashboard) => {
    return { type: adminAT.GET_DASHBOARD_SUCCESS, dashboard };
  };
  const failure = () => {
    return { type: adminAT.GET_DASHBOARD_FAILURE };
  };
  dispatch(request());
  return usersProfilesService.getDashboardInfo(token).then(
    (dashboard) => dispatch(success(dashboard)),
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

const createUserProfile = (profile, token) => {
  const request = () => {
    return { type: adminAT.CREATE_USER_PROFILE };
  };
  const success = (profiles) => {
    return { type: adminAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: adminAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
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

const updateUserProfile = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
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

const deleteUserProfile = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
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

const deleteUser = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
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

const updateUser = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
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

export const adminActions = {
  fetchDashboard,
  fetchUserProfiles,
  fetchUsers,
  createUserProfile,
  updateUserProfile,
  updateUser,
  deleteUserProfile,
  deleteUser,
};
