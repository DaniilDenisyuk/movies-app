import messagesAT from "../actionTypes/messages";

export const addInfo = (message) => ({
  type: messagesAT.ADD_INFO_MESSAGE,
  payload: { message },
});

export const addError = (message) => ({
  type: messagesAT.ADD_ERROR_MESSAGE,
  payload: { message },
});

export const addSuccess = (message) => ({
  type: messagesAT.ADD_SUCCESS_MESSAGE,
  payload: { message },
});
