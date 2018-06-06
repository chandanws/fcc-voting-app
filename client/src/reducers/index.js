import { combineReducers } from "redux";
import polls from "./pollsReducer";
import specificPoll from "./specificPollReducer";

export default combineReducers({
  polls,
  specificPoll
});
