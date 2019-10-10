import { combineReducers } from "redux";
import auth from "./auth";
import groups from "./groups";
import students from "./students";
import teachers from "./teachers";

export default combineReducers({
    auth,
    groups,
    students,
    teachers
});