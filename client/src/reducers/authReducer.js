import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  CHECK_TOKEN_LOGIN,
  FAIL_LOGIN
} from "../actions/authActions";

const initialState = {
  isChecking: false,
  id: null,
  username: "",
  fail: false,
  failMessage: ""
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
    default:
      return state;
  }
};
