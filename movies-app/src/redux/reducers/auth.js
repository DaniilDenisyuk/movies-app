import usersAT from "../actionTypes/users";

const authentication = (state = {}, action) => {
  switch (action.type) {
    case usersAT.LOGIN_REQUEST:
      return {
        isLoggingIn: true,
        user: action.user,
      };
    case usersAT.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.user,
      };
    case usersAT.LOGIN_FAILURE:
      return {};
    case usersAT.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authentication;
