import {
  REQUEST_COMMENTS,
  RECEIEVE_COMMENTS,
  REQUEST_MAKE_COMMENT,
  FAIL_MAKE_COMMENT,
  SUCCESS_MAKE_COMMENT
} from "../actions/commentActions";

const initialState = {
  isLoading: false,
  isCreating: false,
  failCreating: false,
  failMessage: "",
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return { ...state, isLoading: true };
    case RECEIEVE_COMMENTS:
      return { ...state, isLoading: false, data: action.payload.data };
    case REQUEST_MAKE_COMMENT:
      return { ...state, isCreating: true };
    case FAIL_MAKE_COMMENT:
      return {
        ...state,
        isCreating: false,
        failCreating: true,
        failMessage: action.payload
      };
    case SUCCESS_MAKE_COMMENT:
      return {
        ...state,
        isCreating: false,
        failCreating: false,
        failMessage: ""
      };
    default:
      return state;
  }
};
