import { REQUEST_COMMENTS, RECEIEVE_COMMENTS } from "../actions/commentActions";

const initialState = {
  isLoading: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return { ...state, isLoading: true };
    case RECEIEVE_COMMENTS:
      return { ...state, isLoading: false, data: action.payload.data };
    default:
      return state;
  }
};
