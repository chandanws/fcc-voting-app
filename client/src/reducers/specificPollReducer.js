import {
  REQUEST_SPECIFIC_POLL,
  RECEIVE_SPECIFIC_POLL
} from "../actions/specificPollActions";

const initialState = {
  isLoading: false,
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SPECIFIC_POLL:
      return { isLoading: true, data: {} };
    case RECEIVE_SPECIFIC_POLL:
      return { isLoading: false, data: action.payload };
    default:
      return state;
  }
};
