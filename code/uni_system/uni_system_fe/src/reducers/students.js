import {
ADD_STUDENT, GET_STUDENTS
} from "../actions/types";

import {updateObject} from "../utils";

const initialState = {
    student: [],
    students: [],
}

const getStudents = (state, action) => {
    return updateObject(state, {
        students: action.payload,
    });
}

const addStudent = (state, action) => {
    return updateObject(state, {
        student: action.payload,
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT: return addStudent(state, action);
        case GET_STUDENTS: return getStudents(state, action);
        default:
            return state;
    }
}

export default reducer;
