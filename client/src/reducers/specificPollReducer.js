import {
  REQUEST_SPECIFIC_POLL,
  RECEIVE_SPECIFIC_POLL,
  REQUEST_POLL_VOTE,
  RECEIVE_POLL_VOTE
} from "../actions/specificPollActions";

const initialState = {
  isLoading: false,
  data: {},
  voting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SPECIFIC_POLL:
      return { ...state, isLoading: true };
    case RECEIVE_SPECIFIC_POLL:
      return { ...state, isLoading: false, data: action.payload };
    case REQUEST_POLL_VOTE:
      return { ...state, voting: true };
    case RECEIVE_POLL_VOTE:
      return { ...state, voting: false };
    default:
      return state;
  }
};
