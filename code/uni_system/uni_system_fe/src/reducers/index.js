import { combineReducers } from "redux";
import auth from "./auth";
import groups from "./groups";
import students from "./students";
import teachers from "./teachers";
import discipline_schedule from "./discipline";

export default combineReducers({
    auth,
    groups,
    students,
    teachers,
    discipline_schedule
});