import { REQUEST_POLLS, RECEIVE_POLLS } from "../actions/pollsActions";

const initialState = {
  isLoading: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POLLS:
      return { ...state, isLoading: true };
    case RECEIVE_POLLS:
      return { ...state, isLoading: false, data: action.payload.data };
    default:
      return state;
  }
};
