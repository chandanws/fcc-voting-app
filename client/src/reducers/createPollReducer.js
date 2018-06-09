import {
  REQUEST_POLL_CREATE,
  FAIL_POLL_CREATE,
  SUCCESS_POLL_CREATE
} from "../actions/createPollActions";

const initialState = {
  isCreating: false,
  fail: false,
  failMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POLL_CREATE:
      return { ...state, isCreating: false };
    case FAIL_POLL_CREATE:
      return {
        ...state,
        isCreating: false,
        fail: true,
        failMessage: action.payload
      };
    case SUCCESS_POLL_CREATE:
      return initialState;
    default:
      return state;
  }
};
