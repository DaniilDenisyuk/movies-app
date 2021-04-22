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
    case usersAT.REGISTER_REQUEST:
      return {
        isRegistering: true,
      };
    case usersAT.REGISTER_SUCCESS:
      return {};
    case usersAT.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};

export default authentication;
