import usersAT from "../actionTypes/users";
const initialState = {
  list: [],
  isLoading: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case usersAT.GET_ALL_USERS_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case usersAT.GET_ALL_USERS_SUCCESS: {
      const { users } = action.payload;
      return {
        list: users,
        isLoading: false,
      };
    }
    case usersAT.GET_ALL_USERS_FAILURE: {
      return {
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default users;
