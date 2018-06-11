import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  FAIL_LOGIN,
  LOGOUT,
  REQUEST_USERNAME_AVAILABILITY,
  RECEIVE_USERNAME_AVAILABILITY
} from "../actions/authActions";

const initialState = {
  isChecking: true,
  id: null,
  username: "",
  fail: false,
  failMessage: "",
  checkingUsernameAvailability: false,
  usernameAvailability: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isChecking: true };
    case RECEIVE_LOGIN:
      return {
        ...state,
        isChecking: false,
        username: action.payload.username,
        id: action.payload.id,
        fail: false
      };
    case FAIL_LOGIN:
      return {
        ...state,
        isChecking: false,
        username: "",
        id: null,
        fail: true,
        failMessage: action.payload
      };
    case LOGOUT:
      return {
        isChecking: false,
        id: null,
        username: "",
        fail: false,
        failMessage: ""
      };
    case REQUEST_USERNAME_AVAILABILITY:
      return { ...state, checkingUsernameAvailability: true };
    case RECEIVE_USERNAME_AVAILABILITY:
      console.log("Did it occur", action.payload);
      return {
        ...state,
        checkingUsernameAvailability: false,
        usernameAvailability: action.payload
      };
    default:
      return state;
  }
};
