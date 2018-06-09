import { combineReducers } from "redux";
import polls from "./pollsReducer";
import specificPoll from "./specificPollReducer";
import comments from "./commentReducer";
import login from "./authReducer";
import createPoll from "./createPollReducer";

export default combineReducers({
  polls,
  specificPoll,
  comments,
  login,
  createPoll
});
