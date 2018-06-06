import { combineReducers } from "redux";
import polls from "./pollsReducer";
import specificPoll from "./specificPollReducer";
import comments from "./commentReducer";

export default combineReducers({
  polls,
  specificPoll,
  comments
});
