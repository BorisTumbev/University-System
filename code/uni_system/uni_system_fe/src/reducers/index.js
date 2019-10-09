import { combineReducers } from "redux";
import auth from "./auth";
import groups from "./groups";
import students from "./students";

export default combineReducers({
    auth,
    groups,
    students
});